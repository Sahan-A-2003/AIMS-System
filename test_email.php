<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Complaint;
use App\Services\ComplaintNotificationService;

try {
    // Get the first complaint
    $complaint = Complaint::first();
    
    if (!$complaint) {
        echo "No complaints found in database.\n";
        exit;
    }
    
    echo "Testing email notification for complaint: " . $complaint->complaint_id . "\n";
    echo "User email: " . $complaint->email . "\n";
    
    // Create notification service
    $notificationService = new ComplaintNotificationService();
    
    // Test submitted notification
    echo "Testing complaint submitted notification...\n";
    $result = $notificationService->sendComplaintSubmittedNotification($complaint);
    
    if ($result) {
        echo "✅ Email notification sent successfully!\n";
        echo "📧 Check the log files for email content.\n";
    } else {
        echo "❌ Failed to send email notification.\n";
    }
    
    // Test assigned notification
    echo "\nTesting complaint assigned notification...\n";
    $assignedAgent = $complaint->assignedAgent;
    if ($assignedAgent) {
        $result2 = $notificationService->sendComplaintAssignedNotification($complaint, $assignedAgent);
        if ($result2) {
            echo "✅ Assignment email notification sent successfully!\n";
        } else {
            echo "❌ Failed to send assignment email notification.\n";
        }
    } else {
        echo "⚠️  No assigned agent found for this complaint.\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
} 