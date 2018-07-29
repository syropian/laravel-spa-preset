<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserConfirmationController extends Controller
{
    public function __invoke()
    {
        $user = User::where('confirmation_token', request('token'))->first();
        if (!$user) {
            return 'Invalid confirmation token.';
        }

        $user->confirm();

        return redirect('/email-confirmed');
    }
}
