<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Mail\PasswordResetRequest;
use Illuminate\Support\Facades\Mail;

class PasswordResetController extends Controller
{
    public function store()
    {
        $email = request('email');

        if (!User::where('email', $email)->exists()) {
            return response()->json(['error' => 'There is no account in our system associated with the email address "' . $email . '".'], 403);
        }

        $token = str_limit(md5($email . str_random()), 32, '');

        DB::table('password_resets')->insert(
            [
                'email' => $email,
                'created_at' => now(),
                'expires_at' => now()->addHour(),
                'token' => $token,
            ]
        );

        Mail::to($email)->send(new PasswordResetRequest($token));
    }

    public function update()
    {
        $validatedData = request()->validate([
            'token' => 'bail|required',
            'password' => 'bail|required|confirmed',
        ]);

        $resetEntry = DB::table('password_resets')->where('token', request('token'))->first();

        if (!$resetEntry) {
            return response()->json(['error' => 'No reset request found for this email'], 403);
        }

        if (now() > Carbon::parse($resetEntry->expires_at)) {
            return response()->json(['error' => 'Your password reset session has expired.'], 403);
        }

        $user = User::where('email', $resetEntry->email)->first();

        $user->password = request('password');
        $user->save();

        DB::table('password_resets')->where('token', request('token'))->delete();

        return response()->json([], 200);
    }
}
