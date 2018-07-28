<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password', 'remember_token', 'confirmation_token'
    ];

    protected $casts = [
        'confirmed' => 'boolean'
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function confirm()
    {
        $this->confirmed = true;
        $this->confirmation_token = null;
        $this->save();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $user->confirmation_token = str_limit(md5($user->email . str_random()), 32, '');
        });
    }
}
