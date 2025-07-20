<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Complaint extends Model
{
    protected $fillable = [
        'complaint_id',
        'title',
        'description',
        'user_id',
        'assigned_agent_id',
        'status',
        'priority',
        'type',
        'branch',
        'resolution_message',
        'resolved_at',
        'requires_manager_approval',
        'manager_approved',
        'approved_by_manager_id',
        'manager_approved_at',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
        'manager_approved_at' => 'datetime',
        'requires_manager_approval' => 'boolean',
        'manager_approved' => 'boolean',
    ];

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
        $lastComplaint = self::orderBy('id', 'desc')->first();
        $nextNumber = $lastComplaint ? (int)substr($lastComplaint->complaint_id, 4) + 1 : 1;
        return 'CMP-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }
}
