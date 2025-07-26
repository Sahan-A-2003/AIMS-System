<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\Complaint;
use App\Models\User;
use App\Services\ComplaintNotificationService;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ComplaintController extends Controller
{
    protected $notificationService;

    public function __construct(ComplaintNotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function store(Request $request)
    {
        try {
            // Check if user is authenticated
            if (!auth()->check()) {
                Log::error('User not authenticated for complaint submission');
                return response()->json([
                    'success' => false,
                    'message' => 'You must be logged in to submit a complaint.'
                ], 401);
            }

            Log::info('Complaint submission started', [
                'user_id' => auth()->id(),
                'request_data' => $request->all()
            ]);
            
            // Validate the request
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'contactNumber' => 'nullable|string|max:15',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'user_id' => 'required|exists:users,id',
                'assigned_agent_id' => 'nullable|exists:users,id',
                'status' => 'nullable|string|in:Open,In Progress,Escalated,Resolved,Closed',
                'priority' => 'nullable|string|in:Low,Medium,High,Urgent',
                'type' => 'nullable|string|in:Technical,Billing,Service,Account,Other',
                'branch' => 'nullable|string|max:100',
            ]);

            if ($validator->fails()) {
                Log::error('Validation failed', $validator->errors()->toArray());
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            Log::info('Validation passed, generating complaint ID');
            
            // Generate a new complaint_id
            $complaintId = Complaint::generateComplaintId();
            Log::info('Generated complaint ID: ' . $complaintId);

            // Prepare complaint data
            $complaintData = [
                'complaint_id' => $complaintId,
                'fullName' => $request->fullName,
                'email' => $request->email,
                'contactNumber' => $request->contactNumber,
                'title' => $request->title,
                'description' => $request->description,
                'user_id' => $request->user_id,
                'assigned_agent_id' => $request->assigned_agent_id,
                'status' => $request->status ?? 'Open',
                'priority' => $request->priority ?? 'Medium',
                'type' => $request->type ?? 'Other',
                'branch' => $request->branch,
                'level' => 0, // New complaints start at level 0
            ];
            
            Log::info('Attempting to create complaint with data:', $complaintData);

            // Create the complaint
            $complaint = Complaint::create($complaintData);
            
            Log::info('Complaint created successfully', [
                'complaint_id' => $complaint->id,
                'complaint_number' => $complaint->complaint_id
            ]);

            // Send notification email
            $this->notificationService->sendComplaintSubmittedNotification($complaint);

            // Return success response
            return response()->json([
                'success' => true,
                'message' => 'Complaint submitted successfully!',
                'complaint' => $complaint,
                'redirect_url' => route('complaints')
            ]);

        } catch (\Exception $e) {
            Log::error('Complaint creation error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getComplaints()
    {
        try {
            $complaints = Complaint::with('user')->orderBy('created_at', 'desc')->get();
            return response()->json($complaints);
        } catch (\Exception $e) {
            Log::error('Error fetching complaints: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch complaints'], 500);
        }
    }

    public function paginatedComplaints(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $user = auth()->user();

        $query = Complaint::with(['user', 'assignedAgent'])->orderBy('created_at', 'desc');

        // Role-based visibility filtering
        if ($user->role === 'agent_level1') {
            // Level 1 agents can only see complaints at level 0 (new) and level 1 (assigned to them)
            $query->where(function ($q) use ($user) {
                $q->where('level', 0)  // New complaints
                  ->orWhere(function ($subQ) use ($user) {
                      $subQ->where('level', 1)
                           ->where(function ($level1Q) use ($user) {
                               $level1Q->whereNull('assigned_agent_id')
                                     ->orWhere('assigned_agent_id', $user->id);
                           });
                  });
            });
        } elseif ($user->role === 'agent_level2') {
            // Level 2 agents can see complaints at level 2 (escalated) and level 5 (manager approved)
            $query->where(function ($q) use ($user) {
                $q->where(function ($level2Q) use ($user) {
                    $level2Q->where('level', 2)
                            ->where(function ($assignedQ) use ($user) {
                                $assignedQ->whereNull('assigned_agent_id')
                                        ->orWhere('assigned_agent_id', $user->id);
                            });
                })->orWhere(function ($level5Q) use ($user) {
                    $level5Q->where('level', 5) // Manager approved complaints
                            ->where(function ($assignedQ) use ($user) {
                                $assignedQ->whereNull('assigned_agent_id')
                                        ->orWhere('assigned_agent_id', $user->id);
                            });
                });
            });
        } elseif ($user->role === 'manager') {
            // Managers can only see complaints at level 3 (pending manager approval)
            $query->where(function ($q) use ($user) {
                $q->where('level', 3)
                  ->where('requires_manager_approval', true)
                  ->where(function ($managerQ) use ($user) {
                      $managerQ->whereNull('assigned_agent_id')
                              ->orWhere('assigned_agent_id', $user->id);
                  });
            });
        } elseif ($user->role === 'admin') {
            // Admins can see all complaints
            // No additional filtering needed
        } else {
            // For other roles (like 'user'), show only their own complaints
            $query->where('user_id', $user->id);
        }

        $complaints = $query->paginate($perPage);

        return response()->json($complaints);
    }

    public function getUserComplaints(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $userId = $request->input('user_id');

        $query = Complaint::with(['user', 'assignedAgent'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc');

        $complaints = $query->paginate($perPage);

        return response()->json($complaints);
    }

    public function getComplaintById($id)
    {
        $complaint = Complaint::with(['user', 'assignedAgent'])->where('complaint_id', $id)->first();

        if (!$complaint) {
            return response()->json(['error' => 'Complaint not found'], 404);
        }

        return response()->json($complaint);
    }

    public function getComplaintByDbId($id)
    {
        $complaint = Complaint::with(['user', 'assignedAgent'])->find($id);

        if (!$complaint) {
            return response()->json(['error' => 'Complaint not found'], 404);
        }

        return response()->json($complaint);
    }

    public function getInProgressCount($id)
    {

        $count = DB::table('complaints')
            ->whereRaw("LOWER(TRIM(status)) = ?", ['in progress'])
            ->count();

        return response()->json(['count' => $count]);
    }

    // Assign complaint to current user
    public function assignToMe($id)
    {
        $user = auth()->user();
        $complaint = Complaint::findOrFail($id);

        // Check if user can assign this complaint
        $canAssign = false;
        
        // Managers can assign any complaint that is pending manager approval or unassigned
        if ($user->role === 'manager') {
            $canAssign = !$complaint->assigned_agent_id || 
                        ($complaint->requires_manager_approval && $complaint->level === 3);
        }
        // Agents can only assign complaints that are not assigned or assigned to them
        else {
            $canAssign = !$complaint->assigned_agent_id || $complaint->assigned_agent_id === $user->id;
        }

        if (!$canAssign) {
            return response()->json(['success' => false, 'message' => 'Already assigned to another agent.'], 403);
        }

        $complaint->assigned_agent_id = $user->id;
        
        // Set level based on agent role and current complaint state
        if ($user->role === 'agent_level1') {
            $complaint->level = 1;
        } elseif ($user->role === 'agent_level2') {
            // If complaint is at level 5 (manager approved), keep it at level 5
            if ($complaint->level === 5) {
                $complaint->level = 5; // Keep at manager approved level
            } else {
                $complaint->level = 2; // Normal level 2 assignment
            }
        } elseif ($user->role === 'manager') {
            // If manager is assigning a complaint pending approval, keep it at level 3
            if ($complaint->requires_manager_approval) {
                $complaint->level = 3;
            } else {
                $complaint->level = 3; // Managers work at level 3
            }
        }
        
        $complaint->save();

        return response()->json(['success' => true, 'message' => 'Complaint assigned to you.', 'agent_name' => $user->name]);
    }

    // Escalate complaint to level 2
    public function escalate($id, Request $request)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 2;
        $complaint->assigned_agent_id = null; // Unassign agent
        $complaint->status = 'Escalated';
       
        // Add escalation details if provided
        if ($request->has('escalation_reason')) {
            $complaint->escalation_reason = $request->escalation_reason;
        }
        if ($request->has('category')) {
            $complaint->category = $request->category;
        }
        
        $complaint->save();
       
        // Send notification email
        $this->notificationService->sendComplaintAssignedNotification($complaint, auth()->user());
        
        // Return appropriate response based on request method
        if ($request->isMethod('post')) {
            return response()->json(['success' => true, 'message' => 'Complaint escalated to Level 2.']);
        } else {
            return redirect()->back()->with('success', 'Complaint escalated to Level 2.');
        }
    }

    // Manager approves complaint (level 5 - ready for level 2 completion)
    public function approveByManager($id, Request $request)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 5; // Manager approved - ready for level 2 completion
        $complaint->status = 'Manager Approved';
        $complaint->requires_manager_approval = false;
        $complaint->manager_approved = true;
        $complaint->approved_by_manager_id = auth()->user()->id;
        $complaint->manager_approved_at = now();
        $complaint->assigned_agent_id = null; // Unassign so level 2 agent can assign
        
        // Add approval details if provided
        if ($request->has('approval_notes')) {
            $complaint->approval_notes = $request->approval_notes;
        }
        
        $complaint->save();
        
        // Send notification email
        $this->notificationService->sendComplaintApprovedNotification($complaint, auth()->user()->name);
        
        // Return appropriate response based on request method
        if ($request->isMethod('post')) {
            return response()->json(['success' => true, 'message' => 'Complaint approved by manager. Ready for Level 2 completion.']);
        } else {
            return redirect()->back()->with('success', 'Complaint approved by manager. Ready for Level 2 completion.');
        }
    }

    // Mark complaint as completed (level 4)
    public function complete($id, Request $request)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 4;
        $complaint->status = 'Resolved';
        $complaint->save();
        
        // Send notification email
        $this->notificationService->sendComplaintApprovedNotification($complaint, auth()->user()->name);
        
        // Return appropriate response based on request method
        if ($request->isMethod('post')) {
            return response()->json(['success' => true, 'message' => 'Complaint marked as completed.']);
        } else {
            return redirect()->back()->with('success', 'Complaint marked as completed.');
        }
    }

    // Send for manager approval (level 3)
    public function requestManagerApproval($id, Request $request)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 3;
        $complaint->status = 'Pending Manager Approval';
        $complaint->requires_manager_approval = true;
        $complaint->assigned_agent_id = null; // Unassign the complaint
       
        // Add approval request details if provided
        if ($request->has('reason')) {
            $complaint->approval_reason = $request->reason;
        }
        if ($request->has('request_title')) {
            $complaint->approval_request_title = $request->request_title;
        }
        if ($request->has('category')) {
            $complaint->approval_category = $request->category;
        }
        if ($request->has('priority')) {
            $complaint->approval_priority = $request->priority;
        }
        if ($request->has('estimated_resolution')) {
            $complaint->estimated_resolution = $request->estimated_resolution;
        }
        if ($request->has('additional_notes')) {
            $complaint->additional_notes = $request->additional_notes;
        }
        if ($request->has('attachments')) {
            $complaint->attachments = $request->attachments;
        }
        
        $complaint->save();
       
        // Send notification email
        $this->notificationService->sendComplaintApprovedNotification($complaint, auth()->user()->name);
        
        // Return appropriate response based on request method
        if ($request->isMethod('post')) {
            return response()->json(['success' => true, 'message' => 'Complaint sent for manager approval.']);
        } else {
            return redirect()->back()->with('success', 'Complaint sent for manager approval.');
        }
    }

    // Reject complaint (level 9)
    public function reject($id, Request $request)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 9;
        $complaint->status = 'Closed';
        
        // Add rejection reason if provided
        if ($request->has('reason')) {
            $complaint->rejection_reason = $request->reason;
        }
        
        $complaint->save();
        
        // Send notification email
        $this->notificationService->sendComplaintRejectedNotification($complaint, auth()->user()->name);
        
        // Return appropriate response based on request method
        if ($request->isMethod('post')) {
            return response()->json(['success' => true, 'message' => 'Complaint rejected.']);
        } else {
            return redirect()->back()->with('success', 'Complaint rejected.');
        }
    }

    // public function show($complaint_id)
    // {
    //     // Log::info("Complaint ID received: $complaint_id");

    //     $complaint = Complaint::where('complaint_id', $complaint_id)->first();

    //     // Log::info("Complaint found: " . json_encode($complaint));

    //     if (!$complaint) {
    //         abort(404, 'Complaint not found');
    //     }

    //     return Inertia::render('pages/ComplaintDetails', [
    //         'complaint' => $complaint,
    //     ]);
    // }

    public function show($id)
    {
        $complaint = Complaint::with(['user', 'assignedAgent'])->find($id);

        if (!$complaint) {
            return redirect()->route('complaints')->with('error', 'Complaint not found');
        }

        // Format the data for the frontend
        $complaintData = [
            'id' => $complaint->id,
            'complaint_id' => $complaint->complaint_id,
            'title' => $complaint->title,
            'name' => $complaint->fullName ?? ($complaint->user->name ?? ''),
            'priority' => $complaint->priority,
            'email' => $complaint->email ?? ($complaint->user->email ?? ''),
            'contact' => $complaint->contactNumber ?? ($complaint->user->contact_number ?? ''),
            'branch' => $complaint->branch,
            'type' => $complaint->type,
            'description' => $complaint->description,
            'assignedAgent' => $complaint->assignedAgent ? $complaint->assignedAgent->name : null,
            'resolutionMessage' => $complaint->resolution_message,
            'submittedDate' => $complaint->created_at ? $complaint->created_at->toDateString() : '',
            'status' => $complaint->status,
        ];

        return \Inertia\Inertia::render('ComplaintDetails', [
            'complaint' => $complaintData,
            'auth' => ['user' => auth()->user()],
        ]);
    }

    // Get complaints pending manager approval (for managers)
    public function getComplaintsPendingManagerApproval(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = 10;

        $complaints = Complaint::with(['user', 'assignedAgent'])
            ->where('requires_manager_approval', true)
            ->where('level', 3)
            ->where('status', 'Pending Manager Approval')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($complaints);
    }

}
