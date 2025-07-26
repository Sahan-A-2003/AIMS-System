<?php

namespace App\Services;

use App\Models\Complaint;
use App\Models\User;
use App\Mail\ComplaintSubmitted;
use App\Mail\ComplaintAssigned;
use App\Mail\ComplaintApproved;
use App\Mail\ComplaintRejected;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ComplaintNotificationService
{
    /**
     * Send notification when complaint is submitted
     */
    public function sendComplaintSubmittedNotification(Complaint $complaint)
    {
        try {
            Mail::to($complaint->email)
                ->send(new ComplaintSubmitted($complaint));
            
            Log::info('Complaint submitted notification sent', [
                'complaint_id' => $complaint->complaint_id,
                'user_email' => $complaint->email
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send complaint submitted notification', [
                'complaint_id' => $complaint->complaint_id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }

    /**
     * Send notification when complaint is assigned to an agent
     */
    public function sendComplaintAssignedNotification(Complaint $complaint, User $assignedAgent)
    {
        try {
            Mail::to($complaint->email)
                ->send(new ComplaintAssigned($complaint, $assignedAgent));
            
            Log::info('Complaint assigned notification sent', [
                'complaint_id' => $complaint->complaint_id,
                'user_email' => $complaint->email,
                'assigned_agent' => $assignedAgent->name
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send complaint assigned notification', [
                'complaint_id' => $complaint->complaint_id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }

    /**
     * Send notification when complaint is approved
     */
    public function sendComplaintApprovedNotification(Complaint $complaint, $approverName = null)
    {
        try {
            Mail::to($complaint->email)
                ->send(new ComplaintApproved($complaint, $approverName));
            
            Log::info('Complaint approved notification sent', [
                'complaint_id' => $complaint->complaint_id,
                'user_email' => $complaint->email,
                'approver' => $approverName
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send complaint approved notification', [
                'complaint_id' => $complaint->complaint_id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }

    /**
     * Send notification when complaint is rejected
     */
    public function sendComplaintRejectedNotification(Complaint $complaint, $rejecterName = null, $rejectionReason = null)
    {
        try {
            Mail::to($complaint->email)
                ->send(new ComplaintRejected($complaint, $rejecterName, $rejectionReason));
            
            Log::info('Complaint rejected notification sent', [
                'complaint_id' => $complaint->complaint_id,
                'user_email' => $complaint->email,
                'rejecter' => $rejecterName,
                'reason' => $rejectionReason
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send complaint rejected notification', [
                'complaint_id' => $complaint->complaint_id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }
} 