const data = {
    companies: [
        {
            companyID: 1,
            name: "sokol j.d.o.o",
            description: "At sokol, we care about our customers!",
            // for simplicity purposes each company has "pax" number (maximum tickets they can sell for each departure)
            pax: 80,
            departures: [
                {
                    departureID: 12,
                    from: "Split",
                    to: "Zagreb",
                    departure: "09-06-2022 18:00:00",
                    arrival: "09-06-2022 22:00:00",
                },
                {
                    departureID: 13,
                    from: "Livno",
                    to: "Tomislavgrad",
                    departure: "10-06-2022 12:00:00",
                    arrival: "10-06-2022 13:30:00",
                },
            ],
        },
    ],
    users: [
        {
            userID: 1,
            name: "Dora the Explorer",
            email: "dora@explorer-mail.com",
            password: "whyPasswordNeedsToBe7CharactersLong",
            tickets: [],
        },
    ],
}

export default data
