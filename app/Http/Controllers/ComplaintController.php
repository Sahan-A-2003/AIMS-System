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
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contactNumber' => 'nullable|string|max:15',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'assigned_agent_id' => 'nullable|exists:users,id',
            'status' => 'nullable|string|in:open,in_progress,resolved,closed',
            'priority' => 'nullable|string|in:low,medium,high,urgent',
            'type' => 'nullable|string|max:100',
            'branch' => 'nullable|string|max:100',
            
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Generate a new complaint_id using your model method
            $complaintId = Complaint::generateComplaintId();

            Complaint::create([
                'fullName' => $request->fullName,
                'email' => $request->email,
                'contactNumber' => $request->contactNumber,
                'complaint_id' => $complaintId,
                'title' => $request->title,
                'description' => $request->description,
                'user_id' => $request->user_id,
                'assigned_agent_id' => $request->assigned_agent_id,
                'status' => $request->status ?? 'open',  
                'priority' => $request->priority ?? 'medium',
                'type' => $request->type,
                'branch' => $request->branch,
            ]);

            return redirect()->route('complaints.index')
                            ->with('success', 'Complaint submitted successfully!');
        } catch (\Exception $e) {
            Log::error('Complaint creation error: ' . $e->getMessage());

            return redirect()->back()
                ->with('error', 'Something went wrong. Please try again later.')
                ->withInput();
        }
    }

    public function index()
    {
         $complaints = Complaint::where('user_id', auth()->id())
        ->orderByDesc('created_at')
        ->get();

        return response()->json($complaints);
    }

    public function getInProgressCount()
    {

    $count = DB::table('complaints')
        ->whereRaw("LOWER(TRIM(status)) = ?", ['in progress'])
        ->count();

    return response()->json(['count' => $count]);
    }

    public function show($complaint_id)
    {
        // Log::info("Complaint ID received: $complaint_id");

        $complaint = Complaint::where('complaint_id', $complaint_id)->first();

        // Log::info("Complaint found: " . json_encode($complaint));

        if (!$complaint) {
            abort(404, 'Complaint not found');
        }

        return Inertia::render('pages/ComplaintDetails', [
            'complaint' => $complaint,
        ]);
    }

}
