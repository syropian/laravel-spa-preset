<template>
  <h1>Hello {{ user.name }}</h1>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
