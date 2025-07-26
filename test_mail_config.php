<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Testing Mail Configuration...\n";
echo "Mail Driver: " . config('mail.default') . "\n";
echo "Mail Host: " . config('mail.mailers.smtp.host') . "\n";
echo "Mail Username: " . config('mail.mailers.smtp.username') . "\n";
echo "Mail Port: " . config('mail.mailers.smtp.port') . "\n";

// Test sending a real email
try {
    echo "\n📧 Testing real email sending...\n";
    
    Mail::raw('This is a test email from AIMS System to verify email configuration is working.', function($message) {
        $message->to('aims.systemuser@gmail.com')
                ->subject('AIMS System - Email Test')
                ->from('aims.systemuser@gmail.com', 'AIMS System');
    });
    
    echo "✅ Email sent successfully!\n";
    echo "📧 Check your Gmail inbox: aims.systemuser@gmail.com\n";
    
} catch (Exception $e) {
    echo "❌ Error sending email: " . $e->getMessage() . "\n";
    echo "This might be due to Gmail security settings.\n";
    echo "You may need to enable 'Less secure app access' or use an App Password.\n";
} 