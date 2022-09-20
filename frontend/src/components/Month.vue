<template>
  <section class="">
    <header class="text-2xl font-bold mb-4">
      {{ months[month] }} ({{completedLabel}})
    </header>
    <main class="grid grid-cols-7 gap-2 md:gap-4">
      <div class="min-w-4 min-h-4 bg-blue-900 text-center py-1 rounded-t-lg" v-for="weekday in daysOfWeek" :key="weekday">{{ weekday }}</div>
      <div class="" v-for="idx in firstDayWeekday" :key="'placeholder'+idx"></div>
      <CalendarDay class="" v-for="day in daysOfMonth" :key="day.toISOString()" :date="day" />
    </main>
  </section>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue"
import CalendarDay from "./CalendarDay.vue"
import {getDaysOfMonth} from "../util/getDaysOfMonth"
import {useCalendarStore} from "../stores/useCalendarStore"

const props = defineProps<{ year: number, month: number }>()

const calendarStore = useCalendarStore()
const completedLabel = computed<string>(() => calendarStore.getCompletedRatio(props.month, props.year).join("/"))

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const firstDayWeekday = ref<number>()
const daysOfMonth = ref<Date[]>()
onMounted(() => {
  // make monday the first day
  daysOfMonth.value = getDaysOfMonth(props.month, props.year)
  firstDayWeekday.value = (daysOfMonth.value[0].getDay() - 1 + 7) % 7
})
</script>

<style scoped lang="scss"></style>
