import moment from "moment"
import { DATETIME_FORMAT } from "./helpers/constants.js"
import { pool, queryDB } from "./pg/connection.js"
import { initTables, INSERT_COMPANY_SQL, INSERT_TRANSFER_SQL } from "./pg/initAll.js"

const cities = ["split", "zagreb", "livno", "tomislavgrad", "rijeka", "frankfurt"]
const companies = [
    {
        name: "Sokol doo",
        description: "sokol",
        pax: 10,
    },
    {
        name: "Tiho doo",
        description: "tiho",
        pax: 20,
    },
    {
        name: "bosna-bus",
        description: "cevapi",
        pax: 30,
    },
]
const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}
const getTwoCities = () => {
    const from = getRandomElement(cities)
    let to = getRandomElement(cities)
    while (to === from) {
        to = getRandomElement(cities)
    }
    return { from, to }
}
export const initPostgres = async () => {
    try {
        await queryDB(initTables())
        for (const company of companies) {
            const res = await queryDB(INSERT_COMPANY_SQL(company.name, company.description, company.pax))
            company.id = res.rows[0]
        }
        for (let i = 0; i < 10; i++) {
            const { from, to } = getTwoCities()
            const { companyId } = getRandomElement(companies.map((el) => el.id))
            const now = moment()
            for (let day = 0; day < 5; day++) {
                for (let hour = 0; hour < 7; hour += 3) {
                    const departure = now.add(day, "d").add(hour, "h")
                    const arrival = departure.add(2, "h")
                    const res = await queryDB(
                        INSERT_TRANSFER_SQL(
                            from,
                            to,
                            departure.format(DATETIME_FORMAT),
                            arrival.format(DATETIME_FORMAT),
                            companyId
                        )
                    )
                }
            }
        }
    } catch (error) {
        console.error(error)
    }
}
