<template>
  <div class="h-screen w-screen bg-blue flex flex-col justify-center items-center px-4">
    <h2 class="text-white mb-4">Welcome to MyApp!</h2>
    <div class="bg-white rounded shadow-lg overflow-hidden max-w-sm p-8">
      <form @submit.prevent="registerUser">
        <input
          v-model="user.name"
          class="text-input text-input-primary w-full mb-4"
          type="text"
          placeholder="Full Name">

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

        <input
          v-model="user.password_confirmation"
          class="text-input text-input-primary w-full mb-4"
          type="password"
          placeholder="Confirm Password">

        <button
          type="submit"
          class="btn btn-primary w-full h-10">Sign Up</button>
      </form>
    </div>
    <p class="text-white mt-4 uppercase tracking-wide font-bold text-xs">Have an account already? <router-link
      :to="{ name: 'Login'}"
      class="text-white">Sign In</router-link></p>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      user: {
        name: 'Collin Henderson',
        email: 'collin@syropia.net',
        password: 'password',
        password_confirmation: 'password'
      },
      errors: []
    }
  },
  methods: {
    ...mapActions(['register']),
    registerUser () {
      this.register(this.user)
    }
  }
}
</script>
