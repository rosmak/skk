import { badResponse, isValidPassword, signJWT } from "../helpers/helper.js"
import { JWT_EXPIRY_SECONDS } from "../helpers/constants.js"
import { queryDB } from "../pg/connection.js"
import { INSERT_USER_SQL, SELECT_USER_BY_EMAIL_AND_PASSWORD_SQL, SELECT_USER_BY_EMAIL_SQL } from "../pg/user.js"

export const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) return badResponse(res, "Please enter all necessary fields.")
    if (!isValidPassword(password)) return badResponse(res, "Password needs to be at least 7 characters long.")

    try {
        let resCount = await queryDB(SELECT_USER_BY_EMAIL_SQL(email))
        if (resCount.rowCount > 0) {
            return badResponse(res, "user already exists")
        }

        let resNewUser = await queryDB(INSERT_USER_SQL(name, email, password))
        return res.send(resNewUser.rows[0])
    } catch (error) {
        console.error(error)
        return badResponse(res, "", 500)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return badResponse(res, "Please provide email and password")
    try {
        let users = await queryDB(SELECT_USER_BY_EMAIL_AND_PASSWORD_SQL(email, password))

        if (users.rowCount !== 1) {
            return badResponse(res, "Wrong username or password")
        }
        let user = users.rows[0]

        const token = signJWT({ userId: user.userId, name: user.name, email: user.email })

        res.cookie("token", token, { maxAge: JWT_EXPIRY_SECONDS * 1000 })

        return res.send()
    } catch (error) {
        console.error(error)
        return badResponse(res, "", 500)
    }
}
