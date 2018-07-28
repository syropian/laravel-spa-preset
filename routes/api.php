<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::get('auth/me', 'AuthController@me');
Route::post('auth/login', 'AuthController@login');
Route::get('auth/refresh', 'AuthController@refresh');
Route::get('auth/logout', 'AuthController@logout');
Route::delete('auth/delete', 'AuthController@destroy');

Route::post('users', 'UserController@store');
Route::get('/users/confirm', 'UserConfirmationController');
