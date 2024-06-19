require('dotenv').config()

const app = require('./app')

;(async () => {
    try {
        const port = process.env.SERVER_PORT || 3000
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
})()

module.exports = app
