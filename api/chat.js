const express = require('express')
const chatRouter = express.Router()
const {getMessagesByChatId, getChatsByUserId, getChatById, createMessage, getMessageById, getChatView, setView} = require('../db/chat')
const {getUserById} = require('../db/users')
const requireUser = require('./requireUser')
const { setMessageToRead } = require('../db/message')


chatRouter.get('/all', requireUser, async(req, res, next) => {
    try {
        const {id} = req.user
        const response = await getChatsByUserId(id)
        res.send(response)
    }catch(error) {
        console.error("There was an erro getting chats", error)
        throw error
    }
})

chatRouter.post('/view/:id', requireUser, async(req, res, next) => {
    try {
        const {id: userId} = req.id
        const {id} = req.params
        const view = await getChatView({userId: userId, chatId: id})
        if(view.view == false) {
            await setView({userId: userId, chatId: id, boolean: true})
        }else {
            await setView({userId: userId, chatId: id, boolean: false})
        }
    }catch(error) {
    }
})

chatRouter.get('/messages/:chatId', requireUser, async (req, res, next) => {
    try {
        const {id} = req.user
        const {chatId} = req.params
        const checkPermission = await getChatById({userId: id, id: chatId})
        console.log('permission here', checkPermission)
        if(checkPermission.user_id_1 !== id && checkPermission.user_id_2 !== id) {
            res.status(401).send({
                error: "PermissionDenied",
                message: "You can not view chats in which is not yours"
            })
        } 
        const messages = await getMessagesByChatId(chatId)
        res.send({messages: messages, color: checkPermission.color})
    }catch(error) {
        console.error("There was an error fetching chat messages", error)
        throw error
    }
})

chatRouter.post('/update/:id', async(req, res, next) => {
    try {
        const {id} = req.user
        const {id: chatId} = req.params
        const response = setMessageToRead({userId: id, chatId: chatId})
        res.send({
            message:"Success",
        })
    }catch(error) {
        console.error("There was an error updating the unread", error)
        throw error
    }
})
chatRouter.post('/send/:id', requireUser, async(req, res, next) => {
    try {
        const {id} = req.params
        const {id: userId} = req.user
        const {message} = req.body
        const obj = await createMessage({chatId:id, userId: userId, message: message})
        const msg = await getMessageById({id: obj.id, userId: userId})
        console.log(msg)
        res.send(msg)
    }catch(error) {
        console.error('There was an error sending a message', error)
        throw error
    }
})
chatRouter.get('/:id', requireUser, async (req, res, next) => {
    try {
        const {id} = req.user
        const chatId = req.params.id
        const view = await getChatView({userId: id, chatId: chatId})
        const chat = await getChatById({userId: id, id: chatId})
        console.log("I'm the chat HERE!")
        console.log(view)
        if (view.view == false) {
            const result = await setView({userId: id, chatId: chatId, boolean: true})
            console.log("I hit here", result, id, chatId)
            res.send(chat)
        }else {
            res.send({
                code:"AlreadyExists",
                message:"Chat already there",
            })
        }

    }catch(error) {
        console.error("There was an error getting chat by id", error)
        throw error
    }
})





module.exports = chatRouter