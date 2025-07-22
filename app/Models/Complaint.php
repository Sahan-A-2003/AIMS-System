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
        'description',
        'assigned_agent_id',
        'status',
        'priority',
        'type',
        'branch',
        'fullName',
        'email',
        'contactNumber',
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
