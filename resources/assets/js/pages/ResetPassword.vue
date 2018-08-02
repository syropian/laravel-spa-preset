<template>
  <div class="h-screen w-screen bg-blue flex flex-col justify-center items-center px-4">
    <h2 class="text-white mb-4">Password Reset</h2>
    <div class="bg-white rounded shadow-lg overflow-hidden max-w-sm p-8">
      <div
        v-if="error"
        class="bg-red text-white rounded mb-4 text-sm p-2">{{ error }}</div>
      <div v-if="!resetRequested">
        <form @submit.prevent="doRequestPasswordReset">
          <p class="text-grey-dark mb-4">Forgot your password? Enter your email address below and we'll send you instructions to reset it.</p>
          <input
            v-model="user.email"
            class="text-input text-input-primary w-full mb-4"
            type="email"
            placeholder="Email">

          <button
            :disabled="!user.email"
            type="submit"
            class="btn btn-primary w-full h-10">Send Reset Instructions</button>

          <p class="mt-4 text-center">
            <router-link
              :to="{ name: 'Login' }"
              class="text-xs text-blue font-bold no-underline">Back to Sign In</router-link>
          </p>
        </form>
      </div>
      <div v-else>
        <p class="text-grey-dark">An email has been sent to {{ user.email }}. Check your inbox for instructions on resetting your password.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ResetPassword',
  data () {
    return {
      resetRequested: false,
      user: {
        email: ''
      },
      error: ''
    }
  },
  methods: {
    ...mapActions(['requestPasswordReset']),
    async doRequestPasswordReset () {
      try {
        await this.requestPasswordReset(this.user)
        this.error = ''
        this.resetRequested = true
      } catch (e) {
        this.error = e.error
      }
    }
  }
}
</script>
