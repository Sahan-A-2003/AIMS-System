<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'user_id',
        'complaint_id',
        'agent_id',
        'full_name',
        'email',
        'rating',
        'liked_most',
        'suggestions',
        'would_recommend',
    ];

    public $timestamps = true;
}
