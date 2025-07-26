# Email Notification System for AIMS Complaint Management

## Overview

The AIMS system now includes a comprehensive email notification system that automatically notifies users about important events in their complaint lifecycle. This system ensures users stay informed about the status of their complaints without needing to constantly check the system.

## Notification Events

### 1. Complaint Submission
- **Trigger**: When a user successfully submits a new complaint
- **Recipient**: The user who submitted the complaint
- **Email Template**: `resources/views/emails/complaint-submitted.blade.php`
- **Content**: Confirmation of submission, complaint details, and next steps

### 2. Complaint Assignment
- **Trigger**: When a complaint is assigned to an agent (level 1 or level 2)
- **Recipient**: The user who submitted the complaint
- **Email Template**: `resources/views/emails/complaint-assigned.blade.php`
- **Content**: Agent assignment details, agent information, and expected timeline

### 3. Complaint Approval
- **Trigger**: When a complaint is approved (marked as completed/resolved)
- **Recipient**: The user who submitted the complaint
- **Email Template**: `resources/views/emails/complaint-approved.blade.php`
- **Content**: Approval confirmation and resolution status

### 4. Complaint Rejection
- **Trigger**: When a complaint is rejected
- **Recipient**: The user who submitted the complaint
- **Email Template**: `resources/views/emails/complaint-rejected.blade.php`
- **Content**: Rejection notification with reason and next steps

## Technical Implementation

### Files Structure

```
app/
├── Mail/
│   ├── ComplaintSubmitted.php
│   ├── ComplaintAssigned.php
│   ├── ComplaintApproved.php
│   └── ComplaintRejected.php
├── Services/
│   └── ComplaintNotificationService.php
└── Http/Controllers/
    └── ComplaintController.php

resources/views/emails/
├── complaint-submitted.blade.php
├── complaint-assigned.blade.php
├── complaint-approved.blade.php
└── complaint-rejected.blade.php
```

### Key Components

#### 1. Mailable Classes (`app/Mail/`)
Each notification type has its own Mailable class that:
- Defines the email subject and content
- Handles data formatting for the email template
- Manages email envelope configuration

#### 2. Email Templates (`resources/views/emails/`)
Professional HTML email templates with:
- Responsive design
- Branded styling
- Clear information hierarchy
- Action-oriented content

#### 3. Notification Service (`app/Services/ComplaintNotificationService.php`)
Centralized service that:
- Handles all email sending logic
- Provides error handling and logging
- Ensures consistent notification delivery

#### 4. Controller Integration (`app/Http/Controllers/ComplaintController.php`)
Updated controller methods that:
- Trigger notifications at appropriate lifecycle events
- Pass relevant data to notification service
- Handle notification failures gracefully

## Email Configuration

### Environment Variables
Configure these in your `.env` file:

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="AIMS Support Team"
```

### Mail Drivers Supported
- SMTP (recommended for production)
- Mailgun
- Amazon SES
- Postmark
- Log (for development/testing)

## Usage Examples

### Sending a Complaint Submission Notification
```php
$notificationService = new ComplaintNotificationService();
$notificationService->sendComplaintSubmittedNotification($complaint);
```

### Sending an Assignment Notification
```php
$notificationService = new ComplaintNotificationService();
$notificationService->sendComplaintAssignedNotification($complaint, $assignedAgent);
```

### Sending an Approval Notification
```php
$notificationService = new ComplaintNotificationService();
$notificationService->sendComplaintApprovedNotification($complaint, $approverName);
```

### Sending a Rejection Notification
```php
$notificationService = new ComplaintNotificationService();
$notificationService->sendComplaintRejectedNotification($complaint, $rejecterName, $rejectionReason);
```

## Testing

### Test Route
Use the test route to verify email functionality:
```
GET /test-email-notifications
```

This route will:
1. Find the first complaint in the database
2. Send a test submission notification
3. Return the result

### Development Testing
For development, you can use the `log` mail driver to write emails to log files instead of actually sending them:

```env
MAIL_MAILER=log
```

Emails will be written to `storage/logs/laravel.log`.

## Error Handling

The notification system includes comprehensive error handling:

1. **Service Level**: Each notification method catches exceptions and logs errors
2. **Controller Level**: Notification failures don't break the main workflow
3. **Logging**: All notification attempts and failures are logged for debugging

## Customization

### Adding New Notification Types
1. Create a new Mailable class: `php artisan make:mail NewNotificationType`
2. Create an email template in `resources/views/emails/`
3. Add a method to `ComplaintNotificationService`
4. Integrate into the appropriate controller method

### Modifying Email Templates
All email templates use Blade templating and can be customized:
- Update styling in the `<style>` section
- Modify content structure
- Add new dynamic content sections

### Customizing Email Content
Each Mailable class can be customized to include:
- Additional data fields
- Different subject lines
- Custom formatting logic

## Best Practices

1. **Always use the notification service** instead of calling Mail directly
2. **Test email templates** across different email clients
3. **Monitor email delivery** in production
4. **Use queue jobs** for high-volume email sending
5. **Implement email preferences** for users who want to opt-out

## Troubleshooting

### Common Issues

1. **Emails not sending**: Check mail configuration in `.env`
2. **Template errors**: Verify Blade syntax in email templates
3. **Missing data**: Ensure all required data is passed to Mailable classes
4. **Delivery failures**: Check SMTP credentials and server settings

### Debug Commands
```bash
# Test mail configuration
php artisan tinker
Mail::raw('Test email', function($message) { $message->to('test@example.com')->subject('Test'); });

# Check mail logs
tail -f storage/logs/laravel.log
```

## Future Enhancements

Potential improvements for the notification system:

1. **Email Preferences**: Allow users to choose which notifications they receive
2. **SMS Notifications**: Add SMS support for critical updates
3. **Push Notifications**: Implement in-app notifications
4. **Notification Queue**: Use Laravel queues for better performance
5. **Email Templates**: Add more sophisticated templates with branding
6. **Notification History**: Track all sent notifications in the database 