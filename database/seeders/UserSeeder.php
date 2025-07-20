<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'first_name' => 'Admin',
            'last_name' => 'User',
            'username' => 'admin',
            'email' => 'admin@aims.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'contact_number' => '0771234567',
            'employee_id' => 'EMP001',
        ]);

        // Create manager user
        User::create([
            'name' => 'Manager User',
            'first_name' => 'Manager',
            'last_name' => 'User',
            'username' => 'manager',
            'email' => 'manager@aims.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'contact_number' => '0771234568',
            'employee_id' => 'EMP002',
        ]);

        // Create Level 1 Agent
        User::create([
            'name' => 'Level 1 Agent',
            'first_name' => 'Level1',
            'last_name' => 'Agent',
            'username' => 'agent1',
            'email' => 'agent1@aims.com',
            'password' => Hash::make('password'),
            'role' => 'agent_level1',
            'contact_number' => '0771234569',
            'employee_id' => 'EMP003',
        ]);

        // Create Level 2 Agent
        User::create([
            'name' => 'Level 2 Agent',
            'first_name' => 'Level2',
            'last_name' => 'Agent',
            'username' => 'agent2',
            'email' => 'agent2@aims.com',
            'password' => Hash::make('password'),
            'role' => 'agent_level2',
            'contact_number' => '0771234570',
            'employee_id' => 'EMP004',
        ]);

        // Create regular user
        User::create([
            'name' => 'Regular User',
            'first_name' => 'Regular',
            'last_name' => 'User',
            'username' => 'user',
            'email' => 'user@aims.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'contact_number' => '0771234571',
            'employee_id' => 'EMP005',
        ]);
    }
}
