<template>
  <div
    class="w-4/5 sm:w-2/3 px-6 py-2 bg-gray-700 rounded-full mx-auto flex items-center shadow-xl"
  >
    <i class="bx bx-search text-white text-xl mr-3"></i>
    <input
      type="text"
      placeholder="Search..."
      class="bg-transparent border-none outline-none w-full text-white"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBox",

  data() {
    return {};
  },
};
</script>

<style scoped></style>
