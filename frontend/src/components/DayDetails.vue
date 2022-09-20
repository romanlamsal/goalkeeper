<template>
  <section>
    <header>
      <button @click="push('/')">{{ "< back" }}</button>
      <h2 class="text-2xl">{{ date.toLocaleDateString('de-De') }}</h2>
    </header>
    <main class="space-y-8 mt-8">
      <button
          v-for="goal in goalKeys"
          :key="goal"

          :class="['w-full rounded-lg text-3xl py-16', dayStatus[goal] ? 'bg-green-500' : 'bg-red-500']"
          @click="toggleGoal(goal)"
      >
        {{ goal }}
      </button>
    </main>
  </section>
</template>

<script setup lang="ts">
import {computed} from "vue"
import {useRoute, useRouter} from "vue-router";
import {Goal, useCalendarStore} from "../stores/useCalendarStore";

const { push } = useRouter()

const route = useRoute()
const date = computed(() => {
  const {year, month, day} = route.params as unknown as { year: number | 'today', month?: number, day?: number }
  if (year === "today") {
    return new Date()
  }
  return new Date(year, month! - 1, day);
})

const calendarStore = useCalendarStore()

const dayStatus = computed<Goal>(() => calendarStore.getGoal(date.value))
const goalKeys = ['food', 'cardio', 'exercise'] as (keyof Goal)[]

function toggleGoal(type: string) {
  calendarStore.setDone({ date: date.value, [type]: !dayStatus.value[type as keyof Goal]})
}

</script>

<style scoped lang="scss"></style>
