<template>
  <div class="page-login">
    <h3>Sign Up</h3>
    <div class="auth-container">
      <form @submit.prevent="registerUser">
        <input
          v-model="user.name"
          type="text"
          placeholder="Full Name">

        <input
          v-model="user.email"
          type="email"
          placeholder="Email">

        <input
          v-model="user.password"
          type="password"
          placeholder="Password">

        <input
          v-model="user.password_confirmation"
          type="password"
          placeholder="Password Confirmation">
        <button type="submit">Sign In</button>
      </form>
    </div>
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
      this.register(this.user).then(() => {
        console.log('Donezo')
        this.$router.push({ name: 'Dashboard' })
      })
    }
  }
}
</script>
