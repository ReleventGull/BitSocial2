require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const client = require('./db/index')
client.connect()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())



const { Server } = require('socket.io')
const { createServer } = require('http')
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ["GET", "POST"]
    }
})







let users = []

io.on('connection', (socket) => {
    users.push(socket.handshake.auth.token)
    console.log('Auth is here bitch', )
    console.log(users)
    console.log("I connected")
    console.log(socket.id)
    socket.on('delete', (arg) => {
        console.log('Id here', socket.id)
        io.to(socket.id).emit('success', 'I was successful in delete')
    })
    
})




const {PORT = 3000} = process.env

server.listen(PORT, () => {
    console.log("I'm listening on port", PORT)
})

const router = require('./api/index')

app.use('/api', router)

