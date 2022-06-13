import cookieParser from "cookie-parser"
import express from "express"
import initRouter from "./router/router.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
        credentials: true,
    })
)
const port = 3000

initRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
