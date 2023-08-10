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







let users = []

io.on('connection', (socket) => {
    const user = jwt.verify(socket.handshake.auth.token, JWT_SECRET)
    users.push({
        id: user.id,
        socketId: socket.id,
        username: user.username,
        path: ''
    })
    socket.on('pathname', (args) => {
        users.map(u => {
            if(u.socketId == socket.id) {
                u.path = args.path
            }
            return u
        })
    })
    socket.on('delete', (arg) => {
        io.to(socket.id).emit('success', 'I was successful in delete')
    })
    socket.on('friend_request', ({recieving}) => {
        const user_receiving = users.filter(u => u.id == recieving)
        if(user_receiving.length > 0) {
                user_receiving.map(u => {
                    io.to(u.socketId).emit('notifyFr', {
                        userId: user.id,
                        path: u.path,
                        action: 'increase'
                })
                if(u.path == '/app/friend/request') {
                    io.to(u.socketId).emit('increaseFr', {
                        message: "IncreaseFriendRequest",
                        userId: user.id,
                        path: u.path
                    })
                }
            })
        }
    })

   socket.on('delete_pending_request', ({recieving, requestId, unread}) => {
        const user_receiving = users.filter(u => u.id == recieving)
        if (user_receiving.length > 0) {
            user_receiving.map(u => {
                io.to(u.socketId).emit('decreaseFr',
                {message: "Delete friend request", 
                requestId: requestId, 
                path: u.path}
                )
                io.to(u.socketId).emit('notifyFr', {
                    requestId: requestId,
                    path: u.path,
                    unread: unread,
                    action: 'decrease',
                })
            })
        }
    })
    socket.on('delete_friend_request', ({userId, requestId}) => {
        const user_receiving = users.filter(u => u.id == userId)
        if (user_receiving.length > 0) {
            user_receiving.map(u => {
                io.to(u.socketId).emit('delete_pending', {
                    requestId: requestId,
                    path: u.path
                })
            })
        }
    })

    socket.on('accept_friend', ({userId, friendId, chatId}) => {
        const user_receiving = users.filter(u => u.id == userId)
        if(user_receiving.length > 0) {
            user_receiving.map(u => {
                io.to(u.socketId).emit('add_friend', {
                    path: u.path,
                    friendId: friendId,
                })
                io.to(u.socketId).emit('create_chat', {
                    path: u.path,
                    chatId: chatId
                })
            })
        }
    })

    

    socket.on('delete_friend', ({userId, friendId, chatId}) => {
        const user_receiving = users.filter(u => u.id == userId)
        console.log(user_receiving, 'user receivingh here')
            if(user_receiving.length > 0) {
                user_receiving.map(u => {
                    io.to(u.socketId).emit('remove_friend', {
                        message: "You've been unfriended",
                        removedId: friendId,
                        path: u.path,
                        chatId: chatId
                    })
                    io.to(u.socketId).emit('remove_chat', {
                        chatId: chatId
                    })
                })
        }
    })

    socket.on('send_message', (args) => {
        const user_receiving = users.filter(u => u.id == args.userReceiving)
        console.log(user_receiving)
        user_receiving.map(u => {
            io.to(u.socketId).emit('receive_message', {
                message: {
                    id: args.id,
                    date: args.date,
                    user_id: args.userId,
                    username: args.username,
                    chat_id: args.chatId,
                    message: args.message,
                },
                path: u.path,
            })
        })
    })

    socket.on('disconnect', () => {
        users.map((u, i, arr) => {
            if (u.socketId == socket.id) {
                arr.splice(i, 1)
            }
            return u
        })
    })
})





const {PORT = 3000} = process.env
server.listen(PORT, () => {
    console.log("I'm listening on port", PORT)
})
const router = require('./api/index')
const { unlink } = require("fs/promises")
app.use('/api', router)

