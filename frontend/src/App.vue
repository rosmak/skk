<template>
    <div>
        <div class="notification" v-if="data.notificationVisible">{{ data.notification }}</div>
        <div class="header">
            <div class="app-name">SKK</div>
            <div class="nav">
                <RouterLink to="/" class="nav-item">Transfers</RouterLink>
                <RouterLink to="/tickets" v-if="data.user" class="nav-item">Tickets</RouterLink>
                <RouterLink to="/login" v-if="!data.user" class="nav-item">Login</RouterLink>
                <div class="nav-item" v-if="data.user" @click="methods.logout">Logout</div>
            </div>
        </div>
        <RouterView />
    </div>
</template>

<script>
import { useNotificationStore } from "./stores/notification"
import { reactive, watch } from "vue"
import { computed } from "@vue/reactivity"
import { useAuthStore } from "./stores/auth"
import router from "./router"

export default {
    name: "App",
    setup(props, context) {
        const authStore = useAuthStore()
        const notificationStore = useNotificationStore()
        let timeout = null
        const data = reactive({
            notificationVisible: false,
            notification: computed(() => {
                return notificationStore.getNotification
            }),

            user: computed(() => {
                return authStore.getUser
            }),
        })

        const methods = {
            showNotification: () => {
                data.notificationVisible = true
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    data.notificationVisible = false
                    notificationStore.setNotification("")
                }, 2000)
            },
            logout: () => {
                authStore.setUser(null)
                router.push({ name: "login" })
                notificationStore.setNotification("Loged out succesffuly")
            },
        }
        watch(
            () => notificationStore.getNotification,
            (val) => {
                if (val) {
                    methods.showNotification()
                }
            }
        )
        return { data, methods }
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    position: relative;
}

.header {
    width: 100%;
    color: white;
    background-color: teal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.app-name {
    font-size: 30px;
    font-weight: bold;
    color: white;
}
.nav {
    display: flex;
    justify-content: end;
    align-items: center;
}
.nav-item {
    margin: 0 10px;
    text-decoration: none;
    color: white;
    cursor: pointer;
}
.router-link-active {
    color: blue;
    font-weight: bolder;
}

.button {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

input {
    box-sizing: border-box;
    height: 30px;
    border-radius: 5px;
}
.notification {
    background-color: green;
    position: fixed;
    right: 10px;
    top: 50px;
    z-index: 100;
    min-width: 200px;
    height: 50px;
    font-weight: bold;
    color: white;
    padding: 10px;
}
</style>
