import pg from "pg"

// Disclaimer: do not use this config in production :D
export const pool = new pg.Pool({
    host: "localhost",
    database: "skk",
    user: "skkuser",
    password: "skkpassword",
    port: 5432,
})

export const queryDB = async (query) => {
    try {
        let res = await pool.query(query)
        return res
    } catch (error) {
        console.error(error)
        return error
    }
}
