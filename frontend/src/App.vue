<template>
  <div class="bg-black min-h-screen text-white pb-32 ">
    <div class="max-w-screen-lg mx-auto pt-16 px-2">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<style scoped lang="scss"></style>
