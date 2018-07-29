<template>
  <div class="h-screen w-screen bg-blue flex flex-col justify-center items-center px-4">
    <h2 class="text-white mb-4">Email Confirmed!</h2>
    <div class="bg-white rounded shadow-lg overflow-hidden max-w-sm p-8">
      <p class="text-grey-dark leading-loose">Thanks for confirming your email! You can head on over to the <router-link
        :to="{ name: 'Dashboard' }"
        class="text-blue">dashboard</router-link> now.</p>
    </div>
  </div>
</template>
