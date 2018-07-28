<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\EmailConfirmation;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }

    public function store()
    {
        $validatedData = request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = User::create(request(['name', 'email', 'password']));

        $token = auth()->login($user);

        Mail::to($user)->send(new EmailConfirmation($user));

        return response()->json([
            'token' => $token,
            'expiry' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }
}
