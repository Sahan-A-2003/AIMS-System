<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // User Management
            ['name' => 'View Users', 'slug' => 'users.view', 'description' => 'View user list and details', 'module' => 'User Management'],
            ['name' => 'Create Users', 'slug' => 'users.create', 'description' => 'Create new users', 'module' => 'User Management'],
            ['name' => 'Edit Users', 'slug' => 'users.edit', 'description' => 'Edit existing users', 'module' => 'User Management'],
            ['name' => 'Delete Users', 'slug' => 'users.delete', 'description' => 'Delete users', 'module' => 'User Management'],
            ['name' => 'Manage User Roles', 'slug' => 'users.manage-roles', 'description' => 'Assign roles to users', 'module' => 'User Management'],

            // Role Management
            ['name' => 'View Roles', 'slug' => 'roles.view', 'description' => 'View role list and details', 'module' => 'Role Management'],
            ['name' => 'Create Roles', 'slug' => 'roles.create', 'description' => 'Create new roles', 'module' => 'Role Management'],
            ['name' => 'Edit Roles', 'slug' => 'roles.edit', 'description' => 'Edit existing roles', 'module' => 'Role Management'],
            ['name' => 'Delete Roles', 'slug' => 'roles.delete', 'description' => 'Delete roles', 'module' => 'Role Management'],

            // Permission Management
            ['name' => 'View Permissions', 'slug' => 'permissions.view', 'description' => 'View permission list and details', 'module' => 'Permission Management'],
            ['name' => 'Create Permissions', 'slug' => 'permissions.create', 'description' => 'Create new permissions', 'module' => 'Permission Management'],
            ['name' => 'Edit Permissions', 'slug' => 'permissions.edit', 'description' => 'Edit existing permissions', 'module' => 'Permission Management'],
            ['name' => 'Delete Permissions', 'slug' => 'permissions.delete', 'description' => 'Delete permissions', 'module' => 'Permission Management'],

            // Complaint Management
            ['name' => 'View Complaints', 'slug' => 'complaints.view', 'description' => 'View complaint list and details', 'module' => 'Complaint Management'],
            ['name' => 'Create Complaints', 'slug' => 'complaints.create', 'description' => 'Create new complaints', 'module' => 'Complaint Management'],
            ['name' => 'Edit Complaints', 'slug' => 'complaints.edit', 'description' => 'Edit existing complaints', 'module' => 'Complaint Management'],
            ['name' => 'Delete Complaints', 'slug' => 'complaints.delete', 'description' => 'Delete complaints', 'module' => 'Complaint Management'],
            ['name' => 'Assign Complaints', 'slug' => 'complaints.assign', 'description' => 'Assign complaints to agents', 'module' => 'Complaint Management'],
            ['name' => 'Escalate Complaints', 'slug' => 'complaints.escalate', 'description' => 'Escalate complaints to higher levels', 'module' => 'Complaint Management'],
            ['name' => 'Resolve Complaints', 'slug' => 'complaints.resolve', 'description' => 'Resolve complaints', 'module' => 'Complaint Management'],

            // Feedback Management
            ['name' => 'View Feedback', 'slug' => 'feedback.view', 'description' => 'View feedback list and details', 'module' => 'Feedback Management'],
            ['name' => 'Create Feedback', 'slug' => 'feedback.create', 'description' => 'Create new feedback', 'module' => 'Feedback Management'],
            ['name' => 'Edit Feedback', 'slug' => 'feedback.edit', 'description' => 'Edit existing feedback', 'module' => 'Feedback Management'],
            ['name' => 'Delete Feedback', 'slug' => 'feedback.delete', 'description' => 'Delete feedback', 'module' => 'Feedback Management'],

            // Dashboard Access
            ['name' => 'Access Dashboard', 'slug' => 'dashboard.access', 'description' => 'Access the main dashboard', 'module' => 'Dashboard'],
            ['name' => 'View Statistics', 'slug' => 'statistics.view', 'description' => 'View system statistics', 'module' => 'Dashboard'],

            // System Management
            ['name' => 'System Settings', 'slug' => 'system.settings', 'description' => 'Manage system settings', 'module' => 'System Management'],
            ['name' => 'View Logs', 'slug' => 'system.logs', 'description' => 'View system logs', 'module' => 'System Management'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
} 