import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";

export const useCalendarStore = defineStore("calendar", {
    state() {
        return {
            byDay: useLocalStorage<{ [key: string]: boolean }>("calendar", {})
        }
    },
    actions: {
        setDone({ date, isDone }: { date: Date, isDone: boolean}) {
            if (!isDone) {
                delete this.byDay[date.toISOString()]
            } else
                this.byDay[date.toISOString()] = isDone
        }
    },
    getters: {
        getIsDone() {
            return (date: Date): boolean => this.byDay[date.toISOString()]
        }
    }
})
