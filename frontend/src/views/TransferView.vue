<template>
    <div v-if="data.buyDialogOpen" class="dialog-container">
        <div class="buy-dialog">
            <div v-if="data.user">
                <div>Name: {{ data.user.name }}</div>
                <div>Email: {{ data.user.email }}</div>
            </div>
            <div>Card Number: <input type="text" placeholder="0000 0000 0000 0000" v-model="data.cardNumber" /></div>
            <div>
                <button class="button" @click="methods.buyTicket">Buy Ticket</button>
                <button class="button" @click="methods.closeDialog">Close</button>
            </div>
        </div>
    </div>
    <div class="transfer-container">
        <div class="filter-form">
            <div class="input-container">Date: <input type="date" v-model="data.filter.date" /></div>
            <div class="input-container">From: <input type="text" v-model="data.filter.from" /></div>
            <div class="input-container">To: <input type="text" v-model="data.filter.to" /></div>
            <div>
                <button class="button" @click="methods.fetchTransfers">Find Transfers</button>
            </div>
        </div>
        <div v-if="!data.transfers.length">No data to show...</div>
        <Transfer
            v-for="transfer in data.transfers"
            :transfer="transfer"
            :key="transfer.transferId"
            @buy="methods.openDialog"
        ></Transfer>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue"
import Transfer from "./../components/Transfer.vue"
import client from "../axios/client"
import { useAuthStore } from "../stores/auth"
import { computed } from "@vue/reactivity"
import { useNotificationStore } from "../stores/notification"

export default {
    name: "TransferView",
    components: {
        Transfer,
    },
    setup() {
        const notificationStore = useNotificationStore()
        const authStore = useAuthStore()
        const data = reactive({
            buyDialogOpen: false,
            transfers: [],
            filter: {
                date: "",
                from: "",
                to: "",
            },
            user: computed(() => {
                return authStore.getUser
            }),
            transferId: "",
            cardNumber: "",
        })

        const methods = {
            openDialog: (transferId) => {
                data.transferId = transferId
                data.buyDialogOpen = true
            },
            closeDialog: () => {
                data.transferId = ""
                data.cardNumber = ""
                data.buyDialogOpen = false
            },
            fetchTransfers: () => {
                const { date, from, to } = data.filter

                client
                    .get("/transfer", {
                        params: { date: date ? date : null, from: from ? from : null, to: to ? to : null },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            data.transfers = res.data
                        }
                    })
            },
            buyTicket: () => {
                client.post(`/buyTicket/${data.transferId}`, { cardNumber: data.cardNumber }).then((res) => {
                    if (res.status === 200) {
                        notificationStore.setNotification("Ticket Bought Succesfully")
                        methods.fetchTransfers()
                    }
                })
                methods.closeDialog()
            },
        }
        onMounted(() => {
            methods.fetchTransfers()
        })
        return { data, methods }
    },
}
</script>
<style>
.transfer-container {
    padding: 10px;
}
.filter-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.input-container {
    margin-right: 20px;
}

.dialog-container {
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    justify-content: center;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);
}
.buy-dialog {
    width: 350px;
    height: 350px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid black;
    padding: 10px;
}
</style>
