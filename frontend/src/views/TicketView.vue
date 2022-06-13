<template>
    <div class="transfer-container">
        <div v-if="!data.tickets.length">There is no tickets...</div>
        <Transfer
            v-for="ticket in data.tickets"
            :transfer="ticket"
            :key="ticket.transferId"
            :isTicket="true"
            @cancel="methods.fetchTickets"
        ></Transfer>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue"
import client from "../axios/client"
import Transfer from "../components/Transfer.vue"

export default {
    name: "MyTicketsView",
    components: { Transfer },
    setup() {
        const data = reactive({
            tickets: [],
        })
        onMounted(() => {
            methods.fetchTickets()
        })
        const methods = {
            fetchTickets: () => {
                client.get("/ticket").then((res) => {
                    if (res.status === 200) {
                        data.tickets = res.data
                    }
                })
            },
        }
        return { data, methods }
    },
}
</script>
