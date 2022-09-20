<template>
  <div
      :class="[
          'border-2 border-white rounded-lg min-h text-center p-1 md:p-4 cursor-pointer',
          !isDone ? 'bg-red-500 border-red-500' : 'bg-green-500 border-green-500',
          isToday && '!border-white',
          isInFuture && '!bg-white !border-white text-black'
      ]"
      @click="toggleIsDone"
  >
    {{ date.getDate() }}
  </div>
</template>

<script setup lang="ts">
import {useCalendarStore} from "../stores/useCalendarStore";
import {computed} from "vue";

const props = defineProps<{ date: Date }>()

const calendarStore = useCalendarStore()
const isDone = computed<boolean>(() => calendarStore.getIsDone(props.date))

const isToday = computed<boolean>(() => props.date.toDateString() === new Date().toDateString())
const isInFuture = computed<boolean>(() => props.date > new Date())

function toggleIsDone() {
  calendarStore.setDone({ date: props.date, isDone: !isDone.value })
}

</script>

<style scoped lang="scss"></style>
