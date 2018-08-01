<template>
  <div class="h-screen w-screen bg-blue flex flex-col justify-center items-center px-4">
    <h2 class="text-white mb-4">Reset Your Password</h2>
    <div class="bg-white rounded shadow-lg overflow-hidden max-w-sm p-8">
      <div v-if="!successfullyReset">
        <form @submit.prevent="resetUserPassword">

          <input
            v-model="user.password"
            class="text-input text-input-primary w-full mb-4"
            type="password"
            placeholder="Password">

          <input
            v-model="user.password_confirmation"
            class="text-input text-input-primary w-full mb-4"
            type="password"
            placeholder="Confirm Password">
          <button
            type="submit"
            class="btn btn-primary w-full h-10">Reset Password</button>
        </form>
      </div>
      <div v-else>
        <p class="text-grey-dark leading-loose">Your password has been reset. You can now <router-link :to="{ name: 'Login' }">sign in</router-link> with your new password.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      successfullyReset: false,
      user: {
        password: '',
        password_confirmation: '',
        token: ''
      },
      errors: []
    }
  },
  mounted () {
    this.user.token = this.$route.query.token
  },
  methods: {
    ...mapActions(['resetPassword']),
    async resetUserPassword () {
      await this.resetPassword(this.user)
      this.successfullyReset = true
    }
  }
}
</script>
