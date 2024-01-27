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
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'title' => 'required',
            'description' => 'required',
            'category' => 'required|in:bug report,feature request,improvement,other',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $feedback = Feedback::create([
            'user_id' => $request->input('user_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'category' => $request->input('category'),
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Feedback created successfully',
            'feedback' => $feedback,
        ], 201);
    }

    // public function getAllFeedbackWithComments()
    // {
    //     // Get all feedback along with their comments
    //     $feedbackWithComments = Feedback::with('comments')->get();

    //     // Transform the data into the desired structure
    //     $result = [];

    //     foreach ($feedbackWithComments as $feedback) {
    //         $result[] = [
    //             'feedback' => $feedback,
    //             'comments' => $feedback->comments,
    //         ];
    //     }

    //     return response()->json([
    //         'status' => 200,
    //         'data' => $result,
    //     ]);
    // }
    public function getAllFeedbackWithComments()
    {
        $feedbacks = Feedback::all();

        // Transform the data into the desired structure
        $result = [];

        foreach ($feedbacks as $feedback) {
            $result[] = [
                'feedback' => $feedback,
                'comments' => $feedback->getComments(), // Use the new method
            ];
        }

        return response()->json([
            'status' => 200,
            'data' => $result,
        ]);
    }
}
