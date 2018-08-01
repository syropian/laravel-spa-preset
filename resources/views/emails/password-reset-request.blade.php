@component('mail::message')
# Reset Your Password

We heard you need a password reset. Click the link below and you'll be redirected to a secure page from which you can set a new password.

@component('mail::button', ['url' => url('/new-password?token=' . $token)])
Reset Password
@endcomponent

If you didn't mean to reset your password, then you can just ignore this email; your password will not change.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
