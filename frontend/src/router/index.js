import { createRouter, createWebHistory } from "vue-router"
import TransferView from "../views/TransferView.vue"
import TicketView from "../views/TicketView.vue"
import LoginView from "../views/LoginView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "transfers",
            component: TransferView,
        },
        {
            path: "/tickets",
            name: "tickets",
            component: TicketView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
    ],
})

export default router
