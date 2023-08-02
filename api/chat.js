const express = require('express')
const chatRouter = express.Router()
const {getMessagesByChatId, getChatsByUserId, getChatById, createMessage, getMessageById} = require('../db/chat')
const {getUserById} = require('../db/users')
const requireUser = require('./requireUser')


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

chatRouter.get('/messages/:chatId', requireUser, async (req, res, next) => {
    try {
        const {id} = req.user
        const {chatId} = req.params
        const checkPermission = await getChatById({userId: id, id: chatId})
        if(checkPermission.user_id_1 !== id && checkPermission.user_id_2 !== id) {
            res.status(401).send({
                error: "PermissionDenied",
                message: "You can not view chats in which is not yours"
            })
        } 
        const messages = await getMessagesByChatId(chatId)
        res.send(messages)
    }catch(error) {
        console.error("There was an error fetching chat messages", error)
        throw error
    }
})

chatRouter.post('/send/:id', requireUser, async(req, res, next) => {
    try {
        const {id} = req.params
        const {id: userId} = req.user
        const {message} = req.body
        const obj = await createMessage({chatId:id, userId: userId, message: message})
        console.log(obj)
        const msg = await getMessageById(obj.id)
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
        const chat = await getChatById({userId: id, id:chatId})
        res.send(chat)
    }catch(error) {
        console.error("There was an error getting chat by id", error)
        throw error
    }
})





module.exports = chatRouter