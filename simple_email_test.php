<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Mail;

echo "Testing Gmail SMTP Configuration...\n";
echo "Mail Driver: " . config('mail.default') . "\n";
echo "Mail Host: " . config('mail.mailers.smtp.host') . "\n";
echo "Mail Username: " . config('mail.mailers.smtp.username') . "\n";
echo "Mail Port: " . config('mail.mailers.smtp.port') . "\n";
echo "Mail Encryption: " . config('mail.mailers.smtp.encryption') . "\n";

// Test sending a simple email
try {
    echo "\n📧 Sending test email...\n";
    
    Mail::raw('This is a test email from AIMS System. Email configuration is working!', function($message) {
        $message->to('aims.systemuser@gmail.com')
                ->subject('AIMS System - Email Test Success')
                ->from('aims.systemuser@gmail.com', 'AIMS System');
    });
    
    echo "✅ Email sent successfully!\n";
    echo "📧 Check your Gmail inbox: aims.systemuser@gmail.com\n";
    echo "🎉 Email system is now fully functional!\n";
    
} catch (Exception $e) {
    echo "❌ Error sending email: " . $e->getMessage() . "\n";
    echo "Please check your Gmail App Password and settings.\n";
} 