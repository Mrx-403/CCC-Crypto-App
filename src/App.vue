<template>
  <router-view />
</template>

<style>
#app {
  font-family: "Poppins", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html {
  scroll-behavior: smooth;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: darkgrey;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
