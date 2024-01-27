<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comm;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function storeComment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'feedback_id' => 'required|exists:feedback,id',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $comment = Comm::create([
            'user_id' => $request->input('user_id'),
            'feedback_id' => $request->input('feedback_id'),
            'content' => $request->input('content'),
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Comment created successfully',
            'comment' => $comment,
        ], 201);
    }
}
