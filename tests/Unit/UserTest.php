<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp()
    {
        parent::setUp();

        $this->user = create('App\Models\User');
    }

    /** @test */
    public function it_can_confirm_a_user()
    {
        $this->assertFalse($this->user->confirmed);
        $this->assertNotNull($this->user->confirmation_token);

        $this->user->confirm();

        $this->assertTrue($this->user->confirmed);
        $this->assertNull($this->user->confirmation_token);

    }

}
