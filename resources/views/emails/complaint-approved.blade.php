<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Complaint Approved</title>
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
        .approval-details {
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
        <h1>Complaint Approved</h1>
    </div>
    
    <div class="content">
        <p>Dear {{ $userName }},</p>
        
        <p>Excellent news! Your complaint has been approved and is now being processed for resolution.</p>
        
        <div class="complaint-details">
            <p><strong>Complaint ID:</strong> <span class="complaint-id">{{ $complaintId }}</span></p>
            <p><strong>Title:</strong> {{ $title }}</p>
            <p><strong>Approved Date:</strong> {{ $approvedDate }}</p>
        </div>
        
        <div class="approval-details">
            <p><strong>Approved By:</strong> {{ $approverName }}</p>
            <p><strong>Status:</strong> Approved and in progress</p>
        </div>
        
        <p>Your complaint has been reviewed and approved by our management team. Our agents are now working to provide you with the best possible solution.</p>
        
        <p>You will receive further updates as your case progresses toward resolution.</p>
        
        <p>Thank you for your patience and understanding.</p>
        
        <p>Best regards,<br>
        AIMS Support Team</p>
    </div>
    
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
    </div>
</body>
</html> 