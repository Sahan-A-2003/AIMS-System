<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\Complaint;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ComplaintController extends Controller
{
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

        if (in_array($user->role, ['agent_level1', 'agent_level2'])) {
            $query->where(function ($q) use ($user) {
                $q->whereNull('assigned_agent_id')
                  ->orWhere('assigned_agent_id', $user->id);
            });
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

    public function getInProgressCount($id)
    {

        $count = DB::table('complaints')
            ->whereRaw("LOWER(TRIM(status)) = ?", ['in progress'])
            ->count();

        return response()->json(['count' => $count]);
    }

    public function assignToMe($id)
    {
        $user = auth()->user();
        $complaint = Complaint::findOrFail($id);

        // Only allow if not already assigned or assigned to this user
        if ($complaint->assigned_agent_id && $complaint->assigned_agent_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Already assigned to another agent.'], 403);
        }

        $complaint->assigned_agent_id = $user->id;
        // Set level based on agent role
        if ($user->role === 'agent_level1') {
            $complaint->level = 1;
        } elseif ($user->role === 'agent_level2') {
            $complaint->level = 2;
        }
        $complaint->save();

        return response()->json(['success' => true, 'message' => 'Complaint assigned to you.', 'agent_name' => $user->name]);
    }

    // Escalate complaint to level 2
    public function escalate($id)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 2;
        $complaint->assigned_agent_id = null; // Unassign agent
        $complaint->status = 'Escalated';
        $complaint->save();
        return redirect()->back()->with('success', 'Complaint escalated to Level 2.');
    }

    // Mark complaint as completed (level 4)
    public function complete($id)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 4;
        $complaint->status = 'Resolved';
        $complaint->save();
        return redirect()->back()->with('success', 'Complaint marked as completed.');
    }

    // Send for manager approval (level 3)
    public function requestManagerApproval($id)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 3;
        $complaint->requires_manager_approval = true;
        $complaint->save();
        return redirect()->back()->with('success', 'Complaint sent for manager approval.');
    }

    // Reject complaint (level 9)
    public function reject($id)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->level = 9;
        $complaint->status = 'Closed';
        $complaint->save();
        return redirect()->back()->with('success', 'Complaint rejected.');
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

}
