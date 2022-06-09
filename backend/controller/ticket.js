import data from "../data/data.js"

export const getTickets = (req, res) => {
    const { email } = req.jwtPayload

    const user = data.users.find((user) => user.email === email)

    return res.send(user.tickets)
}

export const buyTicket = (req, res) => {
    const { email } = req.jwtPayload
    const { departureID } = req.params
    const { cardNumber } = req.body

    if (!cardNumber) {
        // TODO: add better responses
        return res.status(400).send("Bad card number")
    }
    let departure
    let company
    data.companies.forEach((cp) => {
        cp.departures.forEach((dep) => {
            if (dep.departureID == departureID) {
                departure = dep
                company = cp
            }
        })
    })

    if (!departure) {
        // TODO: add better responses
        return res.status(400).send("Departure does not exist")
    }
    const user = data.users.find((user) => user.email === email)
    return res.send("buying ticket")
}
