<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    /**
     * Display the user management dashboard.
     */
    public function index(): Response
    {
        $users = User::with(['complaints', 'assignedComplaints'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'role' => $user->role,
                    'contact_number' => $user->contact_number,
                    'employee_id' => $user->employee_id,
                    'branch_id' => $user->branch_id,
                    'created_at' => $user->created_at->format('M d, Y'),
                    'last_login' => $user->last_login ?? 'Never',
                    'status' => $user->email_verified_at ? 'Active' : 'Pending',
                    'complaints_count' => $user->complaints->count(),
                    'assigned_complaints_count' => $user->assignedComplaints->count(),
                ];
            });

        $stats = [
            'total_users' => User::count(),
            'active_users' => User::whereNotNull('email_verified_at')->count(),
            'admin_users' => User::where('role', 'admin')->count(),
            'manager_users' => User::where('role', 'manager')->count(),
            'agent_users' => User::whereIn('role', ['agent_level1', 'agent_level2'])->count(),
            'regular_users' => User::where('role', 'user')->count(),
        ];

        return Inertia::render('UserManagement', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        return Inertia::render('Register');
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'username' => 'required|string|max:100|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'contact_number' => 'nullable|string|max:15',
            'employee_id' => 'nullable|string|max:50|unique:users,employee_id',
            'role' => 'required|in:user,agent_level1,agent_level2,manager,admin',
            'branch_id' => 'nullable|integer',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
            'employee_id' => $request->employee_id,
            'role' => $request->role,
            'branch_id' => $request->branch_id,
            'password' => Hash::make($request->password),
            'name' => $request->first_name . ' ' . $request->last_name,
            'email_verified_at' => now(), // Auto-verify for admin-created users
        ]);

        return redirect()->route('user-management.index')
            ->with('success', 'User created successfully!');
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('UserManagement/Edit', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'contact_number' => $user->contact_number,
                'employee_id' => $user->employee_id,
                'branch_id' => $user->branch_id,
                'status' => $user->email_verified_at ? 'active' : 'pending',
            ],
        ]);
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'username' => 'required|string|max:100|unique:users,username,' . $user->id,
            'email' => 'required|email|unique:users,email,' . $user->id,
            'contact_number' => 'nullable|string|max:15',
            'employee_id' => 'nullable|string|max:50|unique:users,employee_id,' . $user->id,
            'role' => 'required|in:user,agent_level1,agent_level2,manager,admin',
            'branch_id' => 'nullable|integer',
            'password' => 'nullable|string|min:6',
        ]);

        $userData = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
            'employee_id' => $request->employee_id,
            'role' => $request->role,
            'branch_id' => $request->branch_id,
            'name' => $request->first_name . ' ' . $request->last_name,
        ];

        if ($request->filled('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);

        return redirect()->route('user-management.index')
            ->with('success', 'User updated successfully!');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(User $user)
    {
        // Prevent admin from deleting themselves
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account!');
        }

        $user->delete();

        return redirect()->route('user-management.index')
            ->with('success', 'User deleted successfully!');
    }

    /**
     * Toggle user status (active/inactive).
     */
    public function toggleStatus(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot deactivate your own account!');
        }

        $user->update([
            'email_verified_at' => $user->email_verified_at ? null : now(),
        ]);

        $status = $user->email_verified_at ? 'activated' : 'deactivated';
        return back()->with('success', "User {$status} successfully!");
    }
} 