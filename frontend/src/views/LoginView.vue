<template>
    <div class="container">
        <div class="login-container">
            <div class="login-header">
                <div class="form-pick" :class="data.login ? 'underline' : ''" @click="methods.switchForm(true)">
                    Login
                </div>
                <div class="form-pick" :class="data.login ? '' : 'underline'" @click="methods.switchForm(false)">
                    Register
                </div>
            </div>
            <div class="form">
                <div v-if="!data.login">Name</div>
                <input v-if="!data.login" class="input" name="name" type="text" v-model="data.form.name" />
                <div>Email</div>
                <input class="input" name="email" type="text" v-model="data.form.email" />
                <div>Password</div>
                <input class="input" name="password" type="password" v-model="data.form.password" />
                <div v-if="data.formError" class="form-error">{{ data.formError }}</div>
                <div class="button-container">
                    <button v-if="data.login" class="button" @click="methods.logIn">Log In</button>
                    <button v-else class="button button-login" @click="methods.register">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue"
import { useAuthStore } from "./../stores/auth"
import router from "../router"
import client from "../axios/client"
import { useNotificationStore } from "../stores/notification"

const auth = useAuthStore()
const notificationStore = useNotificationStore()
const data = reactive({
    login: true,
    formError: "",
    form: {
        name: "",
        email: "",
        password: "",
    },
})

const methods = {
    logIn: () => {
        client
            .post("/login", {
                email: data.form.email,
                password: data.form.password,
            })
            .then((res) => {
                if (res.status === 200) {
                    auth.setUser(res.data)
                    router.push({ name: "transfers" })
                    notificationStore.setNotification("loged in successfuly")
                } else {
                    data.formError = res.data.error
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    register: () => {
        client
            .post("/register", data.form)
            .then((res) => {
                if (res.status === 200) {
                    notificationStore.setNotification("registered successfuly")
                    data.login = true
                } else {
                    data.formError = res.data.error
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    switchForm: (val) => {
        data.login = val
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.login-container {
    width: 400px;
    margin-top: 20px;
    border: 1px solid grey;
    border-radius: 10px;
}
.form {
    padding: 20px;
}
.input {
    width: 100%;
    margin-bottom: 20px;
    padding: 5px;
}
.button-container {
    display: flex;
    justify-content: center;
}

.login-header {
    padding: 5px;
    display: flex;
    justify-content: space-evenly;
}
.underline {
    text-decoration: underline;
}
.form-pick {
    cursor: pointer;
}
.form-error {
    color: red;
}
</style>
