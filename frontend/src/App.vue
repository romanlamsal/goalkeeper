<template>
  <div class="bg-black h-screen text-white">
    <Month :month="now.getMonth()" :year="now.getFullYear()" />
  </div>
</template>


<script setup lang="ts">
import Month from "./components/Month.vue";

const now = new Date()
</script>

