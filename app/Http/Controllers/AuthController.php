<?php

namespace App\Http\Controllers;

use JWTAuth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me(Request $request)
    {
        return auth()->user();
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }


    public function logout()
    {
        auth()->logout();

        return response()->json([], 205);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'expiry' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }
}
