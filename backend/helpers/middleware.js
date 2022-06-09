import { isValidJWT } from "./helper.js"

export const requireAuthentication = (req, res, next) => {
    const token = req.cookies.token
    const jwtPayload = isValidJWT(token)
    if (!jwtPayload) return res.status(401).send("Please Authenticate")
    req.jwtPayload = jwtPayload
    next()
}
