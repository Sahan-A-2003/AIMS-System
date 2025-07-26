<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Complaint Assigned</title>
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
            background-color: #059669;
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
            border-left: 4px solid #059669;
        }
        .agent-details {
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border: 1px solid #bbf7d0;
        }
        .complaint-id {
            font-weight: bold;
            color: #059669;
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
        <h1>Complaint Assigned to Agent</h1>
    </div>
    
    <div class="content">
        <p>Dear {{ $userName }},</p>
        
        <p>Great news! Your complaint has been assigned to a qualified agent who will handle your case.</p>
        
        <div class="complaint-details">
            <p><strong>Complaint ID:</strong> <span class="complaint-id">{{ $complaintId }}</span></p>
            <p><strong>Title:</strong> {{ $title }}</p>
            <p><strong>Assigned Date:</strong> {{ $assignedDate }}</p>
        </div>
        
        <div class="agent-details">
            <p><strong>Assigned Agent:</strong> {{ $assignedAgentName }}</p>
            <p><strong>Agent Level:</strong> {{ ucfirst(str_replace('_', ' ', $assignedAgentRole)) }}</p>
        </div>
        
        <p>Your assigned agent will review your complaint and begin working on a solution. You can expect regular updates on the progress of your case.</p>
        
        <p>You can track the status of your complaint by logging into your account or using the complaint tracking feature with your complaint ID.</p>
        
        <p>Thank you for your patience.</p>
        
        <p>Best regards,<br>
        AIMS Support Team</p>
    </div>
    
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
    </div>
</body>
</html> 