import { badResponse } from "../helpers/helper.js"
import { queryDB } from "../pg/connection.js"
import { GET_TRANSFERS_SQL } from "../pg/transfer.js"

export const getTransfers = async (req, res) => {
    const { date, from, to } = req.query
    try {
        const transfers = await queryDB(GET_TRANSFERS_SQL(date, from, to))
        res.send(transfers.rows)
    } catch (error) {
        console.error(error)
        return badResponse(res, "", 500)
    }
}
