import { getTransfers } from "../controller/transfer.js"
import { login, register } from "../controller/auth.js"
import { test } from "../controller/test.js"
import { requireAuthentication } from "../helpers/middleware.js"
import { buyTicket, cancelTicket, getTickets } from "../controller/ticket.js"

const initRouter = (app) => {
    app.get("/", test)
    app.post("/register", register)
    app.post("/login", login)
    app.get("/departure", getTransfers)

    // all routes under this call require authentication user to be authenticated
    app.use(requireAuthentication)
    app.get("/ticket", getTickets)
    app.post("/cancelTicket/:ticketId", cancelTicket)
    app.post("/buyTicket/:transferId", buyTicket)
}

export default initRouter
