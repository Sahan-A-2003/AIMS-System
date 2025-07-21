<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    /**
     * Display a listing of the permissions.
     */
    public function index(): Response
    {
        $permissions = Permission::orderBy('module')
            ->orderBy('name')
            ->get()
            ->groupBy('module')
            ->map(function ($permissions) {
                return $permissions->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'slug' => $permission->slug,
                        'description' => $permission->description,
                        'module' => $permission->module,
                        'roles_count' => $permission->roles->count(),
                        'users_count' => $permission->users->count(),
                        'created_at' => $permission->created_at->format('M d, Y'),
                    ];
                });
            });

        return Inertia::render('PermissionManagement', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new permission.
     */
    public function create(): Response
    {
        return Inertia::render('PermissionManagement/Create');
    }

    /**
     * Store a newly created permission.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'slug' => 'required|string|max:100|unique:permissions,slug',
            'description' => 'nullable|string',
            'module' => 'nullable|string|max:100',
        ]);

        Permission::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'module' => $request->module,
        ]);

        return redirect()->route('permission-management.index')
            ->with('success', 'Permission created successfully!');
    }

    /**
     * Show the form for editing the specified permission.
     */
    public function edit(Permission $permission): Response
    {
        return Inertia::render('PermissionManagement/Edit', [
            'permission' => [
                'id' => $permission->id,
                'name' => $permission->name,
                'slug' => $permission->slug,
                'description' => $permission->description,
                'module' => $permission->module,
            ],
        ]);
    }

    /**
     * Update the specified permission.
     */
    public function update(Request $request, Permission $permission)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'slug' => 'required|string|max:100|unique:permissions,slug,' . $permission->id,
            'description' => 'nullable|string',
            'module' => 'nullable|string|max:100',
        ]);

        $permission->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'module' => $request->module,
        ]);

        return redirect()->route('permission-management.index')
            ->with('success', 'Permission updated successfully!');
    }

    /**
     * Remove the specified permission.
     */
    public function destroy(Permission $permission)
    {
        // Check if permission is used by roles or users
        if ($permission->roles()->count() > 0 || $permission->users()->count() > 0) {
            return back()->with('error', 'Cannot delete permission that is assigned to roles or users.');
        }

        $permission->delete();

        return redirect()->route('permission-management.index')
            ->with('success', 'Permission deleted successfully!');
    }
} 