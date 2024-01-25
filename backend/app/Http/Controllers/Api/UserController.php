<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{




    public function login(Request $request)
    {
        $email = $request->input('email');
        $pass = $request->input('password');

        if (Auth::attempt(['email' => $email, 'password' => $pass])) {
            $user = Auth::user();
            return response()->json([
                'status' => 200,
                'message' => 'Login successful',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid credentials',
            ]);
        }
    }


    public function signup(Request $request)
    {
        $email = $request->input('email');

        $existingEmail = User::where('email', $email)->first();

        if ($existingEmail) {
            return response()->json([
                'status' => 409,
                'message' => 'User with this email already exists!'
            ]);
        }

        $user = new User();
        $user->name = $request->input('name');
        $user->email = $email;
        $user->password = Hash::make($request->input('password'));

        $user->save();

        return response()->json([
            'status' => 201,
            'message' => 'User created successfully!',
            'user' => $user,
        ]);
    }
}
