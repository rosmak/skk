import { DATETIME_FORMAT } from "../helpers/constants.js"
import { badResponse } from "../helpers/helper.js"
import { queryDB } from "../pg/connection.js"
import { DELETE_TICKET_SQL, INSERT_TICKET_SQL, SELECT_TICKET_BY_ID_SQL, SELECT_USER_TICKETS_SQL } from "../pg/ticket.js"
import { SELECT_TRANSFER_AND_AVAILABLE_SEATS_SQL } from "../pg/transfer.js"
import moment from "moment"

export const getTickets = async (req, res) => {
    const { userId } = req.jwtPayload

    try {
        const userTickets = await queryDB(SELECT_USER_TICKETS_SQL(userId))
        return res.send(userTickets.rows)
    } catch (error) {
        console.error(error)
        return badResponse(res, "", 500)
    }
}

export const buyTicket = async (req, res) => {
    const { userId } = req.jwtPayload
    const { transferId } = req.params
    const { cardNumber } = req.body

    if (!cardNumber) {
        return badResponse(res, "Please provide card number")
    }

    try {
        const transfers = await queryDB(SELECT_TRANSFER_AND_AVAILABLE_SEATS_SQL(transferId))
        if (transfers.rowCount !== 1) {
            return res.status(500).send("no transfer")
        }
        const transfer = transfers.rows[0]
        if (transfer.availableSeats < 1) {
            return res.send("there is no seats left")
        }

        const newTicket = await queryDB(INSERT_TICKET_SQL(userId, transferId))

        res.send(newTicket.rows)
    } catch (error) {
        console.error(error)
        return badResponse(res, "", 500)
    }
}

export const cancelTicket = async (req, res) => {
    const { ticketId } = req.params

    try {
        const tickets = await queryDB(SELECT_TICKET_BY_ID_SQL(ticketId))
        if (tickets.rowCount !== 1) {
            return res.status(500).send("no ticket")
        }
        const ticket = tickets.rows[0]
        const now = moment()
        const departure = moment(ticket.departure, DATETIME_FORMAT)
        if (now.isAfter(departure.subtract(60, "m"))) {
            return badResponse(res, "You can cancel a ticket at least 1 hour before departing.")
        }

        const deleteTicket = await queryDB(DELETE_TICKET_SQL(ticketId))

        return res.send(deleteTicket.rows[0].ticketId)
    } catch (error) {
        console.error(error)
        return badResponse(res, "", 500)
    }
}
