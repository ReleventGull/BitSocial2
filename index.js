require("dotenv").config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const client = require('./db/index')

server = express()
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())
const router = require('./api/index')

const {PORT = 3000} = process.env

server.listen(PORT, () => {
    console.log("I'm listening on port", PORT)
})

client.connect()
server.use('/api', router)

