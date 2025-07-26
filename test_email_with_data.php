<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Complaint;
use App\Services\ComplaintNotificationService;

try {
    // Create a test complaint with proper email
    $testComplaint = new Complaint();
    $testComplaint->complaint_id = 'CMP-TEST-' . time();
    $testComplaint->title = 'Test Email Complaint';
    $testComplaint->description = 'This is a test complaint to verify email notifications are working.';
    $testComplaint->fullName = 'Test User';
    $testComplaint->email = 'test@example.com'; // Valid email for testing
    $testComplaint->contactNumber = '1234567890';
    $testComplaint->priority = 'Medium';
    $testComplaint->type = 'Technical'; // Use valid complaint type
    $testComplaint->branch = 'Colombo';
    $testComplaint->status = 'Open';
    $testComplaint->level = 0;
    $testComplaint->user_id = 1;
    $testComplaint->save();
    
    echo "✅ Test complaint created: " . $testComplaint->complaint_id . "\n";
    echo "📧 Email: " . $testComplaint->email . "\n";
    
    // Create notification service
    $notificationService = new ComplaintNotificationService();
    
    // Test submitted notification
    echo "\n📧 Testing complaint submitted notification...\n";
    $result = $notificationService->sendComplaintSubmittedNotification($testComplaint);
    
    if ($result) {
        echo "✅ Email notification sent successfully!\n";
        echo "📧 Check the log files for email content.\n";
    } else {
        echo "❌ Failed to send email notification.\n";
    }
    
    // Test assigned notification
    echo "\n📧 Testing complaint assigned notification...\n";
    
    // Create a mock user for testing
    $mockUser = new \App\Models\User();
    $mockUser->name = 'Test Agent';
    $mockUser->email = 'agent@example.com';
    
    $result2 = $notificationService->sendComplaintAssignedNotification($testComplaint, $mockUser);
    
    if ($result2) {
        echo "✅ Assignment email notification sent successfully!\n";
    } else {
        echo "❌ Failed to send assignment email notification.\n";
    }
    
    // Test approved notification
    echo "\n📧 Testing complaint approved notification...\n";
    $result3 = $notificationService->sendComplaintApprovedNotification($testComplaint, 'Test Manager');
    
    if ($result3) {
        echo "✅ Approval email notification sent successfully!\n";
    } else {
        echo "❌ Failed to send approval email notification.\n";
    }
    
    // Clean up - delete test complaint
    $testComplaint->delete();
    echo "\n🧹 Test complaint cleaned up.\n";
    
    echo "\n📋 Summary:\n";
    echo "- Test complaint created and deleted\n";
    echo "- 3 email notifications tested\n";
    echo "- Check storage/logs/laravel.log for email content\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 