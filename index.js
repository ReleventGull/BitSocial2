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
    console.log(users)
    const user = jwt.verify(socket.handshake.auth.token, JWT_SECRET)
    users[`${user.id}`] = {
        socketId: socket.id,
        username: user.username
    }
    socket.on('pathname', (args) => {
        users[`${user.id}`]['path'] = args.path
    })
    socket.on('delete', (arg) => {
        io.to(socket.id).emit('success', 'I was successful in delete')
    })
    socket.on('friend_request', ({recieving}) => {
        const user_recieving = users[`${recieving}`]
        if(user_recieving) {
            console.log(user_recieving)
            io.to(user_recieving.socketId).emit('notifyFr', {
                userId: user.id,
                path: user_recieving.path
            })
            if(user_recieving.path == '/friend/request') {
                io.to(user_recieving.socketId).emit('increaseFr', {
                    message: "IncreaseFriendRequest",
                    userId: user.id,
                    path: user_recieving.path
                })
            }
        }
    })
   socket.on('delete_pending_request', ({recieving, requestId}) => {
        const user_recieving = users[`${recieving}`]
        if (user_recieving) {
            io.to(user_recieving.socketId).emit('decreaseFr',
            {message: "Delete friend request", requestId: requestId, path: user_recieving.path})
        }
    })
    socket.on('delete_friend_request', ({userId, requestId}) => {
        const user_recieving = users[`${userId}`]
        if (user_recieving) {
            io.to(user_recieving.socketId).emit('delete_pending', {
                requestId: requestId,
                path: user_recieving.path
            })
        }
    })
    socket.on('accept_friend', ({userId, friendId}) => {
        console.log("I'm on friend bro", userId)
        const user_recieving = users[`${userId}`]
        console.log(user_recieving)
        if(user_recieving) {
            io.to(user_recieving.socketId).emit('add_friend', {
                path: user_recieving.path,
                friendId: friendId
            })
        }
    })

    socket.on('disconnect', () => {
        delete users[`${user.id}`]
    })
})




const {PORT = 3000} = process.env

server.listen(PORT, () => {
    console.log("I'm listening on port", PORT)
})

const router = require('./api/index')

app.use('/api', router)

