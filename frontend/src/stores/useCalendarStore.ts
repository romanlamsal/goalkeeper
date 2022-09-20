import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";
import {getDaysOfMonth} from "../util/getDaysOfMonth";

export type Goal = { food: boolean, cardio: boolean, exercise: boolean };
type State = { [key: string]: Goal | undefined }

export const useCalendarStore = defineStore("calendar", {
    state() {
        return {
            byDay: useLocalStorage<State>("calendar", {})
        }
    },
    actions: {
        setDone({ date, ...goal }: { date: Date } & Partial<Goal>) {
            this.byDay[date.toISOString()] = {
                food: false,
                cardio: false,
                exercise: false,
                ...this.byDay[date.toISOString()],
                ...goal
            }

            if (Object.values(this.byDay[date.toISOString()]!).every(g => !g))
                delete this.byDay[date.toISOString()]
        }
    },
    getters: {
        getGoal() {
            return (date: Date) => this.byDay[date.toISOString()] || { food: false, exercise: false, cardio: false }
        },
        getIsDone() {
            return (date: Date): boolean => {
                const dayStatus = this.byDay[date.toISOString()]
                if (!dayStatus)
                    return false
                return Object.values(dayStatus).every(goal => goal)
            }
        },
        getCompletedRatio(): (month: number, year?: number) => [number, number] {
            return (month, year) => {
                const daysOfMonth = getDaysOfMonth(month, year)
                return [daysOfMonth
                    .reduce<number>((numCompleted, currentDate) => this.getIsDone(currentDate) ? numCompleted + 1 : numCompleted, 0),
                    daysOfMonth.length
                ]
            }
        }
    }
})
