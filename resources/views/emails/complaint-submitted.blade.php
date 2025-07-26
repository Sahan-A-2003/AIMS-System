<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Complaint Submitted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4F46E5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .complaint-details {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border-left: 4px solid #4F46E5;
        }
        .complaint-id {
            font-weight: bold;
            color: #4F46E5;
            font-size: 18px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Complaint Submitted Successfully</h1>
    </div>
    
    <div class="content">
        <p>Dear {{ $userName }},</p>
        
        <p>Your complaint has been successfully submitted to our system. We have received your request and will process it as soon as possible.</p>
        
        <div class="complaint-details">
            <p><strong>Complaint ID:</strong> <span class="complaint-id">{{ $complaintId }}</span></p>
            <p><strong>Title:</strong> {{ $title }}</p>
            <p><strong>Description:</strong> {{ $description }}</p>
            <p><strong>Submitted Date:</strong> {{ $submittedDate }}</p>
        </div>
        
        <p>Please keep this complaint ID for future reference. You can track the status of your complaint by logging into your account or using the complaint tracking feature.</p>
        
        <p>Our team will review your complaint and assign it to the appropriate agent. You will receive another notification once your complaint has been assigned.</p>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        
        <p>Thank you for choosing our service.</p>
        
        <p>Best regards,<br>
        AIMS Support Team</p>
    </div>
    
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
    </div>
</body>
</html> 