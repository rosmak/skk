import { badResponse, isValidJWT } from "./helper.js"

export const requireAuthentication = (req, res, next) => {
    const token = req.cookies.token
    const jwtPayload = isValidJWT(token)
    if (!jwtPayload) return badResponse(res, "You need to be authenticated", 401)
    req.jwtPayload = jwtPayload
    next()
}
