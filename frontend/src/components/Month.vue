<template>
  <section class="max-w-screen-lg mx-auto pt-16 px-2">
    <header class="text-2xl font-bold mb-4">
      {{ months[month] }} {{  }}
    </header>
    <main class="grid grid-cols-7 gap-2 md:gap-4">
      <div class="min-w-4 min-h-4 bg-blue-900 text-center py-1 rounded-t-lg" v-for="weekday in daysOfWeek" :key="weekday">{{ weekday }}</div>
      <div class="" v-for="idx in firstDayWeekday" :key="'placeholder'+idx"></div>
      <Day class="" v-for="day in daysOfMonth" :key="day.toISOString()" :date="day" />
    </main>
  </section>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Day from "./Day.vue";

const props = defineProps<{ year: number, month: number }>()

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const firstDayWeekday = ref<number>()
const daysOfMonth = ref<Date[]>()
onMounted(() => {
  // const lastDayOfMonth = new Date(props.year, props.month + 1, 0)
  // is the first day of the given month
  let dayIterator = new Date(props.year, props.month, 1)
  // make monday the first day
  firstDayWeekday.value = (dayIterator.getDay() - 1 + 7) % 7
  const days: Date[] = []
  do {
    days.push(dayIterator)
    dayIterator = new Date(dayIterator.getFullYear(), dayIterator.getMonth(), dayIterator.getDate() + 1)
  } while (dayIterator.getMonth() === props.month)
  daysOfMonth.value = days
})
</script>

<style scoped lang="scss"></style>
