import { defineStore } from "pinia"

export const useNotificationStore = defineStore({
    id: "notification",
    state: () => ({
        notification: "",
    }),
    getters: {
        getNotification: (state) => state.notification,
    },
    actions: {
        setNotification(payload) {
            this.notification = payload
        },
    },
})
