import cookieParser from "cookie-parser"
import express from "express"
import initRouter from "./router/router.js"

const app = express()
app.use(express.json())
app.use(cookieParser())
const port = 3000

initRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
