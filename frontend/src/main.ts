import { createApp } from 'vue'
import './style.css'
import App from "./App.vue"
import Calendar from './components/Calendar.vue'
import DayDetails from './components/DayDetails.vue'
import {createPinia} from "pinia"
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"

const app = createApp(App);

const pinia = createPinia()
app.use(pinia)

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Calendar
    },
    {
        path: "/day/:year/:month/:day",
        component: DayDetails
    }
]
const router = createRouter({
    history: createWebHistory("/goalkeeper"),
    routes,
})
app.use(router)

app.mount('#app')

