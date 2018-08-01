<template>
  <div class="h-screen w-screen bg-blue flex flex-col justify-center items-center px-4">
    <div class="bg-white rounded shadow-lg overflow-hidden max-w-sm p-8">
      <p class="text-grey-dark leading-loose">Hey <strong>{{ user.name }}</strong>, welcome to your Dashboard.</p>
      <p class="text-center mt-4">
        <router-link
          :to="{ name: 'Logout' }"
          class="text-blue">Sign Out</router-link>
      </p>
    </div>
  </div>
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
