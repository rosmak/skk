import crypto from "crypto"
import { JWT_EXPIRY_SECONDS, JWT_KEY } from "./constants.js"
import jwt from "jsonwebtoken"

export const generateID = () => crypto.randomBytes(16).toString("hex")

export const isValidPassword = (password) => password.length >= 7

export const isValidJWT = (token) => {
    if (!token) {
        return false
    }
    var payload
    try {
        payload = jwt.verify(token, JWT_KEY)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return false
        }
        return false
    }

    return payload
}

export const signJWT = (data) => {
    return jwt.sign(data, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: JWT_EXPIRY_SECONDS,
    })
}
