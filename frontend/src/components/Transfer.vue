<template>
    <div class="transfer">
        <div>
            <div class="transfer-text">{{ transfer.from.toUpperCase() }} - {{ transfer.to.toUpperCase() }}</div>
            <div>Departure: {{ methods.formatDate(transfer.departure) }}</div>
            <div>Arrival: {{ methods.formatDate(transfer.arrival) }}</div>
        </div>
        <div v-if="data.user">
            <button
                class="button button-buy"
                :disabled="transfer.availableSeats === 0 || !transfer.canBuy"
                @click="methods.buyTicket(transfer.transferId)"
                v-if="!isTicket"
            >
                {{ data.buyButtonText }}
            </button>
            <div v-else>
                <button
                    class="button button-cancel"
                    v-if="data.canCancel"
                    @click="methods.cancelTicket(transfer.ticketId)"
                >
                    Cancel
                </button>
                <div v-else>Can not cancel ticket</div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
import { reactive } from "vue"
import { useNotificationStore } from "../stores/notification"
import { useAuthStore } from "../stores/auth"
import { computed } from "@vue/reactivity"
import client from "../axios/client"

export default {
    name: "Transfer",
    props: {
        transfer: Object,
        isTicket: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {
        const authStore = useAuthStore()
        const notificationStore = useNotificationStore()
        const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss"
        const DISPLAY_FORMAT = "HH:mm:ss - DD.MM.YYYY."
        const data = reactive({
            user: computed(() => {
                return authStore.getUser
            }),
            canCancel: computed(() => {
                const now = moment()
                const departure = moment(props.transfer.departure, DATETIME_FORMAT)
                if (now.isAfter(departure.subtract(60, "m"))) {
                    return false
                }
                return true
            }),
            buyButtonText: computed(() => {
                if (!props.transfer.canBuy) {
                    return "Already departed"
                }
                if (props.transfer.availableSeats < 1) {
                    return "No seats available"
                }
                return "BUY"
            }),
        })

        const methods = {
            formatDate: (date) => {
                return moment(date, DATETIME_FORMAT).format(DISPLAY_FORMAT)
            },
            buyTicket: (transferId) => {
                context.emit("buy", transferId)
            },
            cancelTicket: (ticketId) => {
                client.post(`/cancelTicket/${ticketId}`).then((res) => {
                    if (res.status === 200) {
                        context.emit("cancel")
                        notificationStore.setNotification("Ticket canceled succesfully")
                    }
                })
            },
        }
        return { data, methods }
    },
}
</script>

<style scoped>
.transfer {
    width: 100%;
    border-radius: 5px;
    border: 1px solid black;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: rgb(216, 216, 216);
}
.transfer-text {
    font-weight: bold;
}
.button-cancel {
    background-color: rgb(255, 124, 124);
}
</style>
