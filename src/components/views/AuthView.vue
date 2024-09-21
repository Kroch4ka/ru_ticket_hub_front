<script setup>
import MainLogo from "../atoms/MainLogo.vue";
</script>

<template>
  <MainLogo />
  <div class="container flex items-center justify-center w-full max-w-full h-dvh">
    <RouterView />
  </div>
</template>
