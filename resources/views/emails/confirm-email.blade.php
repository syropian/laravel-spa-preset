@component('mail::message')
# One Last Step

Hey, thanks for checking out MyApp! We just need to confirm your email address so we know you're human. Clicking that button below will do the trick.

@component('mail::button', ['url' => url('/api/users/confirm?token=' . $user->confirmation_token)])
Confirm Email
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
