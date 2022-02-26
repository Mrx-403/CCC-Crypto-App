<template>
  <div
    v-if="isOpen"
    class="fixed overflow-x-hidden overflow-y-auto flex inset-0 z-50"
    id="modal-container"
    :class="[insetX, insetY]"
  >
    <div class="relative flex w-full h-full">
      <slot></slot>
      <div
        class="absolute w-6 h-6 pr-3 pt-3 top-0 right-0 flex items-center justify-center cursor-pointer"
        @click="$emit('ModalClosed')"
      >
        <i class="bx bx-x text-2xl text-white cursor-pointer"></i>
      </div>
    </div>
  </div>
  <div
    v-if="isOpen"
    class="absolute inset-0 z-40 bg-gray-500 opacity-25"
    @click="$emit('ModalClosed')"
  ></div>
</template>

<script>
export default {
  name: "Modal",
  props: ["isOpen", "insetX", "insetY"],
  emits: ["ModalClosed"],
  watch: {
    isOpen: function ModalToggleHandler() {
      if (!this.isOpen) {
        const parentDiv =
          document.getElementById("modal-container").parentElement;
        parentDiv.classList.remove("h-screen");
        parentDiv.classList.remove("overflow-hidden");
        return;
      }
    },
  },
  updated() {
    if (this.isOpen) {
      const parentDiv =
        document.getElementById("modal-container").parentElement;
      parentDiv.classList.add("h-screen");
      parentDiv.classList.add("overflow-hidden");
      return;
    }
  },
};
</script>

<style scoped>
@media (min-height: 900px) and (min-width : 650px) {
  #modal-container {
    top: 32%;
    bottom: 32%;
  }
}
</style>
