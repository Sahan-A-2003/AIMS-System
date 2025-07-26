<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Complaint extends Model
{
    protected $fillable = [
        'complaint_id',
        'fullName',
        'email',
        'contactNumber',
        'title',
        'description',
        'user_id',
        'assigned_agent_id',
        'status',
        'priority',
        'type',
        'branch',
        'level',
        'escalation_reason',
        'category',
        'approval_reason',
        'approval_request_title',
        'approval_category',
        'approval_priority',
        'estimated_resolution',
        'additional_notes',
        'attachments',
        'approval_notes',
        'resolution_message',
        'resolved_at',
        'requires_manager_approval',
        'manager_approved',
        'approved_by_manager_id',
        'manager_approved_at',
        'rejection_reason',
    ];

    protected $table = 'complaints';

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignedAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_agent_id');
    }

    public function approvedByManager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by_manager_id');
    }

    public function feedback(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }

    // Generate complaint ID
    public static function generateComplaintId(): string
    {
        $lastComplaint = self::orderBy('complaint_id', 'desc')->first();
        if (!$lastComplaint) {
            return 'CMP-001';
        }
        
        // Find the highest numeric complaint ID
        $complaints = self::where('complaint_id', 'like', 'CMP-%')
            ->orderBy('complaint_id', 'desc')
            ->get(['complaint_id']);
        
        $maxNumber = 0;
        foreach ($complaints as $complaint) {
            // Extract number from CMP-XXX format
            if (preg_match('/^CMP-(\d+)$/', $complaint->complaint_id, $matches)) {
                $number = (int)$matches[1];
                if ($number > $maxNumber) {
                    $maxNumber = $number;
                }
            }
        }
        
        $nextNumber = $maxNumber + 1;
        return 'CMP-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }
}
