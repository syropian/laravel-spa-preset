<template>
  <h1>Hello {{ user.name }}</h1>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    if (!Object.keys(this.user).length) {
      this.fetchUser()
    }
  },
  methods: {
    ...mapActions(['fetchUser'])
  }
}
</script>
