<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        // Check if user is admin
        if (auth()->user()->role !== 'admin') {
            return redirect()->route('dashboard')->with('error', 'Access denied. Admin only.');
        }

        return inertia('Reports/Index');
    }

    public function getComplaintStatistics()
    {
        // Check if user is admin
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Access denied'], 403);
        }

        try {
            $currentMonth = Carbon::now()->startOfMonth();
            $lastMonth = Carbon::now()->subMonth()->startOfMonth();

            // Overall statistics
            $totalComplaints = Complaint::count();
            $openComplaints = Complaint::where('status', 'Open')->count();
            $inProgressComplaints = Complaint::where('status', 'In Progress')->count();
            $resolvedComplaints = Complaint::where('status', 'Resolved')->count();
            $closedComplaints = Complaint::where('status', 'Closed')->count();

            // Level-based statistics
            $level0Complaints = Complaint::where('level', 0)->count();
            $level1Complaints = Complaint::where('level', 1)->count();
            $level2Complaints = Complaint::where('level', 2)->count();
            $level3Complaints = Complaint::where('level', 3)->count();
            $level5Complaints = Complaint::where('level', 5)->count();
            $level9Complaints = Complaint::where('level', 9)->count(); // Rejected

            // Current month statistics
            $currentMonthComplaints = Complaint::whereMonth('created_at', $currentMonth->month)
                ->whereYear('created_at', $currentMonth->year)
                ->count();

            $currentMonthResolved = Complaint::whereMonth('resolved_at', $currentMonth->month)
                ->whereYear('resolved_at', $currentMonth->year)
                ->count();

            // Last month statistics
            $lastMonthComplaints = Complaint::whereMonth('created_at', $lastMonth->month)
                ->whereYear('created_at', $lastMonth->year)
                ->count();

            $lastMonthResolved = Complaint::whereMonth('resolved_at', $lastMonth->month)
                ->whereYear('resolved_at', $lastMonth->year)
                ->count();

            // Agent performance
            $agentPerformance = User::whereIn('role', ['agent_level1', 'agent_level2'])
                ->withCount(['assignedComplaints', 'resolvedComplaints'])
                ->get()
                ->map(function ($agent) {
                    $resolutionRate = $agent->assigned_complaints_count > 0 
                        ? round(($agent->resolved_complaints_count / $agent->assigned_complaints_count) * 100, 2)
                        : 0;
                    
                    return [
                        'id' => $agent->id,
                        'name' => $agent->name,
                        'role' => $agent->role,
                        'assigned_complaints' => $agent->assigned_complaints_count,
                        'resolved_complaints' => $agent->resolved_complaints_count,
                        'resolution_rate' => $resolutionRate,
                    ];
                });

            // Monthly trends (last 6 months)
            $monthlyTrends = [];
            for ($i = 5; $i >= 0; $i--) {
                $month = Carbon::now()->subMonths($i);
                $monthlyTrends[] = [
                    'month' => $month->format('M Y'),
                    'created' => Complaint::whereMonth('created_at', $month->month)
                        ->whereYear('created_at', $month->year)
                        ->count(),
                    'resolved' => Complaint::whereMonth('resolved_at', $month->month)
                        ->whereYear('resolved_at', $month->year)
                        ->count(),
                ];
            }

            // Priority distribution
            $priorityDistribution = Complaint::select('priority', DB::raw('count(*) as count'))
                ->groupBy('priority')
                ->get()
                ->pluck('count', 'priority')
                ->toArray();

            // Type distribution
            $typeDistribution = Complaint::select('type', DB::raw('count(*) as count'))
                ->groupBy('type')
                ->get()
                ->pluck('count', 'type')
                ->toArray();

            // Branch distribution
            $branchDistribution = Complaint::select('branch', DB::raw('count(*) as count'))
                ->groupBy('branch')
                ->get()
                ->pluck('count', 'branch')
                ->toArray();

            return response()->json([
                'success' => true,
                'data' => [
                    'overall' => [
                        'total' => $totalComplaints,
                        'open' => $openComplaints,
                        'in_progress' => $inProgressComplaints,
                        'resolved' => $resolvedComplaints,
                        'closed' => $closedComplaints,
                    ],
                    'levels' => [
                        'level_0' => $level0Complaints,
                        'level_1' => $level1Complaints,
                        'level_2' => $level2Complaints,
                        'level_3' => $level3Complaints,
                        'level_5' => $level5Complaints,
                        'level_9' => $level9Complaints,
                    ],
                    'current_month' => [
                        'created' => $currentMonthComplaints,
                        'resolved' => $currentMonthResolved,
                    ],
                    'last_month' => [
                        'created' => $lastMonthComplaints,
                        'resolved' => $lastMonthResolved,
                    ],
                    'agent_performance' => $agentPerformance,
                    'monthly_trends' => $monthlyTrends,
                    'priority_distribution' => $priorityDistribution,
                    'type_distribution' => $typeDistribution,
                    'branch_distribution' => $branchDistribution,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDetailedReport(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Access denied'], 403);
        }

        try {
            $query = Complaint::with(['user', 'assignedAgent', 'approvedByManager']);

            // Apply filters
            if ($request->filled('level')) {
                $query->where('level', $request->level);
            }

            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            if ($request->filled('priority')) {
                $query->where('priority', $request->priority);
            }

            if ($request->filled('type')) {
                $query->where('type', $request->type);
            }

            if ($request->filled('branch')) {
                $query->where('branch', $request->branch);
            }

            if ($request->filled('date_from')) {
                $query->whereDate('created_at', '>=', $request->date_from);
            }

            if ($request->filled('date_to')) {
                $query->whereDate('created_at', '<=', $request->date_to);
            }

            if ($request->filled('agent_id')) {
                $query->where('assigned_agent_id', $request->agent_id);
            }

            // Get paginated results
            $complaints = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $complaints
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch detailed report: ' . $e->getMessage()
            ], 500);
        }
    }

    public function exportReport(Request $request)
    {
        // Check if user is admin
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Access denied'], 403);
        }

        try {
            $query = Complaint::with(['user', 'assignedAgent', 'approvedByManager']);

            // Apply same filters as detailed report
            if ($request->filled('level')) {
                $query->where('level', $request->level);
            }

            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            if ($request->filled('priority')) {
                $query->where('priority', $request->priority);
            }

            if ($request->filled('type')) {
                $query->where('type', $request->type);
            }

            if ($request->filled('branch')) {
                $query->where('branch', $request->branch);
            }

            if ($request->filled('date_from')) {
                $query->whereDate('created_at', '>=', $request->date_from);
            }

            if ($request->filled('date_to')) {
                $query->whereDate('created_at', '<=', $request->date_to);
            }

            if ($request->filled('agent_id')) {
                $query->where('assigned_agent_id', $request->agent_id);
            }

            $complaints = $query->orderBy('created_at', 'desc')->get();

            // Transform data for export
            $exportData = $complaints->map(function ($complaint) {
                return [
                    'Complaint ID' => $complaint->complaint_id,
                    'Title' => $complaint->title,
                    'Description' => $complaint->description,
                    'Status' => $complaint->status,
                    'Level' => $complaint->level,
                    'Priority' => $complaint->priority,
                    'Type' => $complaint->type,
                    'Branch' => $complaint->branch,
                    'Submitted By' => $complaint->user ? $complaint->user->name : 'N/A',
                    'Assigned Agent' => $complaint->assignedAgent ? $complaint->assignedAgent->name : 'Not Assigned',
                    'Manager Approved By' => $complaint->approvedByManager ? $complaint->approvedByManager->name : 'N/A',
                    'Created Date' => $complaint->created_at ? $complaint->created_at->format('Y-m-d H:i:s') : 'N/A',
                    'Resolved Date' => $complaint->resolved_at ? $complaint->resolved_at->format('Y-m-d H:i:s') : 'N/A',
                    'Rejection Reason' => $complaint->rejection_reason ?? 'N/A',
                    'Escalation Reason' => $complaint->escalation_reason ?? 'N/A',
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $exportData,
                'filename' => 'complaints_report_' . date('Y-m-d_H-i-s') . '.json'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to export report: ' . $e->getMessage()
            ], 500);
        }
    }
} 