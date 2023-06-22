require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const client = require('./db/index')
const jwt = require('jsonwebtoken')
const { JWT_SECRET} = process.env
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







let users = {}

io.on('connection', (socket) => {
    const user = jwt.verify(socket.handshake.auth.token, JWT_SECRET)
    users[`${user.id}`] = {
        socketId: socket.id,
        username: user.username
    }
    socket.on('delete', (arg) => {
        console.log('Id here', socket.id)
        io.to(socket.id).emit('success', 'I was successful in delete')
    })
    socket.on('disconnect', () => {
        console.log("I fcking dced")
        console.log('before', users)
        delete users[`${user.id}`]
        console.log('after', users)
    })
})




const {PORT = 3000} = process.env

server.listen(PORT, () => {
    console.log("I'm listening on port", PORT)
})

const router = require('./api/index')

app.use('/api', router)

