import data from "../data/data.js"
import { DATE_FORMAT } from "../helpers/constants.js"
import moment from "moment"

export const getDepartures = (req, res) => {
    const queryArr = Object.keys(req.query)
    const { date, from, to } = req.query
    const momentDate = moment(date, DATE_FORMAT)

    let departures = []
    data.companies.forEach((company) => {
        const companyDepartures = company.departures
            .filter((departure) => {
                const departureDate = moment(departure.departure, DATE_FORMAT)

                if (queryArr.length === 0) return true
                if (queryArr.includes("date") && !departureDate.isSame(momentDate)) return false
                if (queryArr.includes("from") && departure.from.toLowerCase() !== from.toLowerCase()) return false
                if (queryArr.includes("to") && departure.to.toLowerCase() !== to.toLowerCase()) return false
                return true
            })
            .map((departure) => {
                return {
                    ...departure,
                    companyID: company.companyID,
                }
            })
        departures = [...departures, ...companyDepartures]
    })
    return res.send(departures)
}
