const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const routes = require('./api/routes')

const app = express()

// Middlewares
app.use(helmet()) // Security middlewares
app.use(cors()) // Enable CORS
app.use(express.json()) // Enable JSON parsing
app.use(cookieParser()) // Enable cookie parsing

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'An interval server error occured' })
})

// Router
app.use(routes)

module.exports = app
