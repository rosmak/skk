import { defineStore } from "pinia"

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: null,
    }),
    getters: {
        getUser: (state) => state.user,
    },
    actions: {
        setUser(payload) {
            this.user = payload
        },
    },
})
