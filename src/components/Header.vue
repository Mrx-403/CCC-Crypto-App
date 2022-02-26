<template>
  <div class="w-full flex p-3 pt-6">
    <div
      class="menu-btn flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md bg-gray-800 cursor-pointer"
      @click="toggleDrawer"
    >
      <i class="bx bx-menu text-white text-3xl sm:text-4xl cursor-pointer"></i>
    </div>
    <div
      class="live-prices-text flex-1 text-white text-xl sm:text-2xl flex items-center justify-center"
    >
      Live prices
    </div>
    <div
      class="bell-btn flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md bg-gray-800"
      v-if="!showAuthButton"
    >
      <i class="bx bx-bell text-white text-2xl sm:text-3xl"></i>
    </div>
    <div
      class="auth-btn flex items-center h-12 px-4 bg-green-600 hover:bg-green-700 transition-all ease-in shadow-md rounded-lg text-white cursor-pointer"
      v-if="showAuthButton"
      @click="$emit('authModalOpened')"
    >
      Login | Sign up
    </div>
  </div>
</template>

<script>
export default {
  emits: ["authModalOpened"],
  methods: {
    toggleDrawer() {
      this.$store.state.isDrawerOpen = !this.$store.state.isDrawerOpen;
    },
  },
  computed: {
    showAuthButton() {
      return !this.$store.state.userAuthenticated;
    },
  },
};
</script>

<style scoped>
@media (max-width: 300px) {
  .auth-btn {
    font-size: 14px;
  }
  .live-prices-text {
    font-size: 14px;
    text-align: center;
  }
}
@media (max-width: 350px) {
  .auth-btn {
    font-size: 14px;
  }
  .live-prices-text {
    font-size: 16px;
  }
}
</style>
