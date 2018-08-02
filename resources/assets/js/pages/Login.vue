<template>
  <div class="h-screen w-screen bg-blue flex flex-col justify-center items-center px-4">
    <h2 class="text-white mb-4">Welcome to MyApp!</h2>
    <div class="bg-white rounded shadow-lg overflow-hidden max-w-sm p-8">
      <div
        v-if="error"
        class="bg-red text-white rounded mb-4 text-sm p-2"
      >{{ error }}</div>
      <form @submit.prevent="loginUser">
        <input
          v-model="user.email"
          class="text-input text-input-primary w-full mb-4"
          type="email"
          placeholder="Email">

        <input
          v-model="user.password"
          class="text-input text-input-primary w-full mb-4"
          type="password"
          placeholder="Password">
        <p class="flex mb-4">
          <router-link
            :to="{ name: 'ResetPassword' }"
            class="ml-auto text-xs text-blue font-bold no-underline">Forgot Password?</router-link>
        </p>
        <button
          :disabled="submitDisabled"
          type="submit"
          class="btn btn-primary w-full h-10">Sign In</button>
      </form>
    </div>
    <p class="text-white mt-4 uppercase tracking-wide font-bold text-xs">New to MyApp? <router-link
      :to="{ name: 'Register'}"
      class="text-white">Sign Up</router-link></p>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  computed: {
    submitDisabled () {
      return Object.keys(this.user).some(field => this.user[field].trim() === '')
    }
  },
  methods: {
    ...mapActions(['login']),
    async loginUser () {
      try {
        await this.login(this.user)
        this.error = ''
        this.$router.push({ name: 'Dashboard' })
      } catch (e) {
        this.error = 'Unable to sign in with the provided credentials'
      }

    }
  }
}
</script>
