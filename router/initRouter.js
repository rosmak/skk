const initRouter = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
      })
}

export default initRouter