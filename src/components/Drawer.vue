<template>
  <div
    class="w-4/5 sm:w-2/3 mx-auto mb-6 overflow-hidden rounded-b-lg transition-all ease-in-out"
    :class="{ 'h-0': !isDrawerOpen, 'h-48': isDrawerOpen }"
  >
    <div class="flex flex-col">
      <div
        class="flex group w-full p-3 mb-3 rounded-full bg-gray-800 shadow-lg text-white items-center hover:bg-green-600 cursor-pointer transition-all ease-in"
      >
        <i
          class="bx bx-bitcoin text-2xl mx-3 text-green-500 group-hover:text-gray-200"
        ></i>
        <h2>Live prices</h2>
        <div class="ml-auto hidden sm:flex items-center mr-3">
          <i
            class="bx bxs-circle text-sm text-green-500 mr-2 group-hover:text-gray-200"
          ></i>
          <span class="text-gray-400 text-sm group-hover:text-gray-200"
            >See live market details of different assets</span
          >
        </div>
      </div>
      <div
        class="flex group w-full p-3 mb-3 rounded-full bg-gray-800 shadow-lg text-white items-center hover:bg-green-600 cursor-pointer transition-all ease-in"
      >
        <i
          class="bx bx-gas-pump text-2xl mx-3 text-green-500 group-hover:text-gray-200"
        ></i>
        <h2>ETH Gas Fee</h2>
        <div class="ml-auto hidden sm:flex items-center mr-3">
          <i
            class="bx bxs-circle text-sm text-green-500 mr-2 group-hover:text-gray-200"
          ></i>
          <span class="text-gray-400 text-sm group-hover:text-gray-200"
            >See details on live ETH gas fee</span
          >
        </div>
      </div>
      <div
        class="flex group w-full p-3 mb-3 rounded-full bg-gray-800 shadow-lg text-white items-center hover:bg-green-600 cursor-pointer transition-all ease-in"
      >
        <i
          class="bx bx-user text-2xl mx-3 text-green-500 group-hover:text-gray-200"
        ></i>
        <h2>Your Account</h2>
        <div class="ml-auto hidden sm:flex items-center mr-3">
          <i
            class="bx bxs-circle text-sm text-green-500 mr-2 group-hover:text-gray-200"
          ></i>
          <span class="text-gray-400 text-sm group-hover:text-gray-200"
            >Manage your account and alerts</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isDrawerOpen() {
      return this.$store.state.isDrawerOpen;
    },
  },
};
</script>

<style></style>
