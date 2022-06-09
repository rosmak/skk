import express from 'express'
import initRouter from './router/initRouter.js'
const app = express()
const port = 3000

initRouter(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
