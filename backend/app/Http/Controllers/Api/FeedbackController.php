<?php

namespace App\Http\Controllers\Api;

use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    public function storeFeedback(Request $request)
    {
        // Validate the request data
        // $validator = Validator::make($request->all(), [
        //     'user_id' => 'required',
        //     'title' => 'required',
        //     'description' => 'required',
        //     // 'category' => 'required|in:bug Bug Report,Feature Request,Improvement',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'status' => 422,
        //         'message' => 'Validation failed',
        //         'errors' => $validator->errors(),
        //     ], 422);
        // }

        $feedback = Feedback::create([
            'user_id' => $request->input('user_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'category' => $request->input('category'),
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Feedback created successfully',
            'feedback' => $feedback,
        ], 201);
    }

    public function getAllFeedbackWithComments()
    {
        $feedbacks = Feedback::with('comments.user')->get();

        $result = [];

        foreach ($feedbacks as $feedback) {
            $feedbackData = [
                'id' => $feedback->id,
                'user_id' => $feedback->user_id,
                'title' => $feedback->title,
                'description' => $feedback->description,
                'category' => $feedback->category,
                'created_at' => $feedback->created_at,
                'updated_at' => $feedback->updated_at,
                'user_name' => $feedback->user->name,
                'comments' => [],
            ];

            foreach ($feedback->comments as $comment) {
                $feedbackData['comments'][] = [
                    'id' => $comment->id,
                    'user_id' => $comment->user_id,
                    'feedback_id' => $comment->feedback_id,
                    'content' => $comment->content,
                    'created_at' => $comment->created_at,
                    'updated_at' => $comment->updated_at,
                    'user_name' => $comment->user->name,
                    'formatted_date' => $comment->created_at->format('d-m-y'),
                ];
            }

            $result[] = $feedbackData;
        }

        return response()->json([
            'status' => 200,
            'data' => $result,
        ]);
    }
}
