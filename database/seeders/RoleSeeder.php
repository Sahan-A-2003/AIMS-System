<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $roles = [
            [
                'name' => 'Super Administrator',
                'slug' => 'super-admin',
                'description' => 'Full system access with all permissions',
                'is_active' => true,
            ],
            [
                'name' => 'Administrator',
                'slug' => 'admin',
                'description' => 'System administrator with most permissions',
                'is_active' => true,
            ],
            [
                'name' => 'Manager',
                'slug' => 'manager',
                'description' => 'Department manager with elevated permissions',
                'is_active' => true,
            ],
            [
                'name' => 'Agent Level 1',
                'slug' => 'agent-level1',
                'description' => 'First level support agent',
                'is_active' => true,
            ],
            [
                'name' => 'Agent Level 2',
                'slug' => 'agent-level2',
                'description' => 'Second level support agent',
                'is_active' => true,
            ],
            [
                'name' => 'User',
                'slug' => 'user',
                'description' => 'Regular system user',
                'is_active' => true,
            ],
        ];

        foreach ($roles as $roleData) {
            $role = Role::create($roleData);
            
            // Assign permissions based on role
            switch ($role->slug) {
                case 'super-admin':
                    // All permissions
                    $role->permissions()->attach(Permission::all()->pluck('id'));
                    break;
                    
                case 'admin':
                    // Most permissions except super admin specific ones
                    $permissions = Permission::whereNotIn('slug', [
                        'system.logs',
                        'system.settings'
                    ])->get();
                    $role->permissions()->attach($permissions->pluck('id'));
                    break;
                    
                case 'manager':
                    // Manager permissions
                    $permissions = Permission::whereIn('slug', [
                        'users.view',
                        'complaints.view',
                        'complaints.edit',
                        'complaints.assign',
                        'complaints.escalate',
                        'complaints.resolve',
                        'feedback.view',
                        'feedback.edit',
                        'dashboard.access',
                        'statistics.view'
                    ])->get();
                    $role->permissions()->attach($permissions->pluck('id'));
                    break;
                    
                case 'agent-level1':
                    // Level 1 agent permissions
                    $permissions = Permission::whereIn('slug', [
                        'complaints.view',
                        'complaints.edit',
                        'complaints.resolve',
                        'feedback.view',
                        'feedback.create',
                        'dashboard.access'
                    ])->get();
                    $role->permissions()->attach($permissions->pluck('id'));
                    break;
                    
                case 'agent-level2':
                    // Level 2 agent permissions
                    $permissions = Permission::whereIn('slug', [
                        'complaints.view',
                        'complaints.edit',
                        'complaints.escalate',
                        'complaints.resolve',
                        'feedback.view',
                        'feedback.create',
                        'feedback.edit',
                        'dashboard.access'
                    ])->get();
                    $role->permissions()->attach($permissions->pluck('id'));
                    break;
                    
                case 'user':
                    // Basic user permissions
                    $permissions = Permission::whereIn('slug', [
                        'complaints.view',
                        'complaints.create',
                        'feedback.view',
                        'feedback.create',
                        'dashboard.access'
                    ])->get();
                    $role->permissions()->attach($permissions->pluck('id'));
                    break;
            }
        }
    }
} 