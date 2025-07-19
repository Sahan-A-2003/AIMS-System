<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;  // Make sure you create this model
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'complaint_id' => 'required|exists:complaints,id',
            'agent_id' => 'nullable|exists:users,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'rating' => 'required|integer|between:1,5',
            'liked_most' => 'nullable|string',
            'suggestions' => 'nullable|string',
            'would_recommend' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $feedback = Feedback::create([
            'user_id' => $request->user_id,
            'complaint_id' => $request->complaint_id,
            'agent_id' => $request->agent_id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'rating' => $request->rating,
            'liked_most' => $request->liked_most,
            'suggestions' => $request->suggestions,
            'would_recommend' => $request->would_recommend,
        ]);

        return response()->json(['message' => 'Feedback submitted successfully', 'feedback' => $feedback], 201);
    }
}
