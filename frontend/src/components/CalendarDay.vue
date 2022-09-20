<template>
  <article
      :class="classlist"
      @click="gotoDetails"
  >
    {{ date.getDate() }}
    <br/>
    {{ numGoals }}/3
  </article>
</template>

<script setup lang="ts">
import {useCalendarStore} from "../stores/useCalendarStore";
import {computed} from "vue";
import {useRouter} from "vue-router"

const { push } = useRouter()

const props = defineProps<{ date: Date }>()

const calendarStore = useCalendarStore()
const percentageDone = computed<boolean>(() => calendarStore.getIsDone(props.date))
const numGoals = computed<number>(() => {
  const dayStatus = calendarStore.byDay[props.date.toISOString()]

  if (!dayStatus)
    return 0

  return Object.values(dayStatus).filter(g => g).length;
})

const isToday = computed<boolean>(() => props.date.toDateString() === new Date().toDateString())
const isInFuture = computed<boolean>(() => props.date > new Date())

function gotoDetails() {
  if (isInFuture.value)
    return

  push(`/day/${props.date.getFullYear()}/${props.date.getMonth() + 1}/${props.date.getDate()}`)
}

const classlist = computed(() => {
  const classes = [
    'border-0 border-transparent rounded-lg min-h text-center p-1 md:px-4 md:py-2',
  ]

  if (percentageDone.value) {
    classes.push("bg-green-500")
  } else if (isInFuture.value) {
    classes.push("bg-white border-white text-black")
  } else {
    if (numGoals.value === 0)
      classes.push("bg-red-500")
    else if (numGoals.value === 1) {
      classes.push("bg-gradient-to-r from-green-500 via-red-500 to-red-500")
    } else if (numGoals.value === 2) {
      classes.push("bg-gradient-to-r from-green-500 via-green-500 to-red-500")
    }
  }

  if (!isInFuture.value)
    classes.push("cursor-pointer")

  if (isToday.value)
    classes.push("border-white")

  return classes
})

</script>

<style scoped lang="css">
.half-done {

}
</style>
