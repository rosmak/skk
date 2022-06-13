import cookieParser from "cookie-parser"
import express from "express"
import initRouter from "./router/router.js"
import cors from "cors"
import { initPostgres } from "./init.js"

const args = process.argv.slice(2, process.argv.length)
const initAll = args.includes("initAll")

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
if (initAll) {
    initPostgres()
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
