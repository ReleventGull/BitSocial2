const cors = require('cors')
const express = require('express')
const morgan = require('morgan')


server = express()

server.use(morgan('dev'))
server.use(cors())

const {PORT = 3000} = process.env
server.listen(() => {
    console.log("I'm listening on port", PORT)
})