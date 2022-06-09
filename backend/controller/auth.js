import { generateID, isValidPassword, signJWT } from "../helpers/helper.js"
import data from "../data/data.js"
import jwt from "jsonwebtoken"
import { JWT_EXPIRY_SECONDS, JWT_KEY } from "../helpers/constants.js"

export const register = (req, res) => {
    const { name, email, password } = req.body
    // TODO: add better responses
    if (!name || !email || !password) return res.send("Please enter all necessary fields.")
    // TODO: add better responses
    if (!isValidPassword(password)) return res.send("Password needs to be at least 7 characters long.")

    const user = data.users.find((user) => user.email === email)
    // TODO: add better responses
    if (user) return res.send("User already exists with that email. ")

    const newUser = {
        userID: generateID(),
        name,
        email,
        password,
        tickets: [],
    }

    data.users.push(newUser)
    // TODO: add better responses
    return res.send("Congratulations!!! You registered successfully!")
}

export const login = (req, res) => {
    const { email, password } = req.body
    // TODO: add better responses
    if (!email || !password) return res.status(401).send("Please provide email and password")

    const user = data.users.find((user) => user.email === email && user.password === password)
    if (!user) {
        // TODO: add better responses
        return res.status(401).send("Wrong username or password")
    }

    const token = signJWT({ email: user.email })

    res.cookie("token", token, { maxAge: JWT_EXPIRY_SECONDS * 1000 })

    // TODO: add better responses
    return res.send("okay you probably logged in")
}
