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
    socket.on('pathname', (args) => {
        console.log(args)
        users[`${user.id}`]['path'] = args.path
    })
    socket.on('delete', (arg) => {
        io.to(socket.id).emit('success', 'I was successful in delete')
    })
    socket.on('friend_request', ({recieving}) => {

        const user_receiving = users[`${recieving}`]
        if(user_receiving) {
            io.to(user_receiving.socketId).emit('notifyFr', {
                userId: user.id,
                path: user_receiving.path,
                action: 'increase'
            })
            if(user_receiving.path == '/app/friend/request') {
                console.log(user_receiving)
                io.to(user_receiving.socketId).emit('increaseFr', {
                    message: "IncreaseFriendRequest",
                    userId: user.id,
                    path: user_receiving.path
                })
            }
        }
    })
   socket.on('delete_pending_request', ({recieving, requestId, unread}) => {
        const user_receiving = users[`${recieving}`]
        if (user_receiving) {
            io.to(user_receiving.socketId).emit('decreaseFr',
            {message: "Delete friend request", 
            requestId: requestId, 
            path: user_receiving.path}
            )
            io.to(user_receiving.socketId).emit('notifyFr', {
                requestId: requestId,
                path: user_receiving.path,
                unread: unread,
                action: 'decrease',
            })
        }
    })
    socket.on('delete_friend_request', ({userId, requestId}) => {
        const user_receiving = users[`${userId}`]
        if (user_receiving) {
            io.to(user_receiving.socketId).emit('delete_pending', {
                requestId: requestId,
                path: user_receiving.path
            })
        }
    })
    socket.on('accept_friend', ({userId, friendId}) => {
        const user_receiving = users[`${userId}`]
        if(user_receiving) {
            io.to(user_receiving.socketId).emit('add_friend', {
                path: user_receiving.path,
                friendId: friendId
            })
        }
    })
    socket.on('delete_friend', ({userId, friendId}) => {
        const user_receiving = users[`${userId}`]
        console.log('user recieving', user_receiving)
            if(user_receiving) {
                io.to(user_receiving.socketId).emit('remove_friend', {
                    message: "You've been unfriended",
                    removedId: friendId,
                    path: user_receiving.path
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

