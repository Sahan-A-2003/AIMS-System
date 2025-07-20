<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Complaint;
use App\Models\User;

class ComplaintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('role', 'user')->first();
        $agent1 = User::where('role', 'agent_level1')->first();
        $agent2 = User::where('role', 'agent_level2')->first();

        // Sample complaints
        Complaint::create([
            'complaint_id' => 'CMP-001',
            'title' => 'Unable to access account',
            'description' => 'After resetting my password, I\'m unable to log into the portal. It shows an error message each time I try.',
            'user_id' => $user->id,
            'assigned_agent_id' => $agent1->id,
            'status' => 'Open',
            'priority' => 'High',
            'type' => 'Technical',
            'branch' => 'Colombo',
        ]);

        Complaint::create([
            'complaint_id' => 'CMP-002',
            'title' => 'Billing error on last invoice',
            'description' => 'My invoice shows an extra charge that I did not make.',
            'user_id' => $user->id,
            'assigned_agent_id' => $agent1->id,
            'status' => 'In Progress',
            'priority' => 'Medium',
            'type' => 'Billing',
            'branch' => 'Kandy',
        ]);

        Complaint::create([
            'complaint_id' => 'CMP-003',
            'title' => 'Delayed response from support',
            'description' => 'I submitted a complaint 3 days ago but haven\'t received any response yet.',
            'user_id' => $user->id,
            'status' => 'Open',
            'priority' => 'Low',
            'type' => 'Service',
            'branch' => 'Galle',
        ]);

        Complaint::create([
            'complaint_id' => 'CMP-004',
            'title' => 'Card declined at ATM',
            'description' => 'User reported that card was declined multiple times at different ATMs.',
            'user_id' => $user->id,
            'assigned_agent_id' => $agent2->id,
            'status' => 'Escalated',
            'priority' => 'High',
            'type' => 'Technical',
            'branch' => 'Colombo',
            'requires_manager_approval' => true,
        ]);

        Complaint::create([
            'complaint_id' => 'CMP-005',
            'title' => 'Account balance discrepancy',
            'description' => 'The balance shown in my online banking doesn\'t match my recent transactions.',
            'user_id' => $user->id,
            'assigned_agent_id' => $agent1->id,
            'status' => 'Resolved',
            'priority' => 'Medium',
            'type' => 'Account',
            'branch' => 'Colombo',
            'resolution_message' => 'Issue resolved after verifying transaction records.',
            'resolved_at' => now(),
        ]);
    }
}
