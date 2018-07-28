<template>
  <div class="page-login">
    <h3>Sign In</h3>
    <div class="auth-container">
      <form @submit.prevent="loginUser">
        <input
          v-model="user.email"
          type="email"
          placeholder="Email">

        <input
          v-model="user.password"
          type="password"
          placeholder="Password">
        <button type="submit">Sign In</button>
      </form>
    </div>
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
      errors: []
    }
  },
  methods: {
    ...mapActions(['login']),
    loginUser () {
      this.login(this.user).then(() => {
        this.$router.push({ to: 'Dashboard' })
      })
    }
  }
}
</script>
