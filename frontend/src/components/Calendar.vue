<template>
  <div class="bg-black min-h-screen text-white pb-32 space-y-16">
    <Month :month="now.getMonth()" :year="now.getFullYear()" />
    <Month :month="now.getMonth() + 1" :year="now.getFullYear()" />
  </div>
</template>

<script setup lang="ts">
import Month from "./Month.vue";

const now = new Date()
</script>

