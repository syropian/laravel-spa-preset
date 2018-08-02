<template>
  <div class="h-screen w-screen bg-blue flex flex-col justify-center items-center px-4">
    <h2 class="text-white mb-4">Reset Your Password</h2>
    <div class="bg-white rounded shadow-lg overflow-hidden max-w-sm p-8">
      <div
        v-if="errors.length"
        class="bg-red text-white rounded mb-4 text-sm p-2"
      >
        <p
          v-for="(error, $index) in errors"
          :key="$index"
          :class="{'mb-2' : errors.length > 1}">&times; {{ error }}</p>
      </div>
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
            :disabled="submitDisabled"
            type="submit"
            class="btn btn-primary w-full h-10">Reset Password</button>

          <p class="mt-4 text-center">
            <router-link
              :to="{ name: 'Login' }"
              class="text-xs text-blue font-bold no-underline">Back to Sign In</router-link>
          </p>
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
  name: 'NewPassword',
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
  computed: {
    submitDisabled () {
      return Object.keys(this.user).some(field => this.user[field].trim() === '')
    }
  },
  mounted () {
    this.user.token = this.$route.query.token
  },
  methods: {
    ...mapActions(['resetPassword']),
    async resetUserPassword () {
      try {
        await this.resetPassword(this.user)
        this.errors = []
        this.successfullyReset = true
      } catch (e) {
        this.errors = []
        if (e.hasOwnProperty('error')) {
          this.errors.push(e.error)
        } else {
          Object.keys(e.errors).forEach(field => {
            if (field === 'token') {
              this.errors.push('An invalid or nonexistent reset token was given')
            } else {
              this.errors.push(e.errors[field][0])
            }
          })
        }
      }
    }
  }
}
</script>
