const express = require('express')
const chatRouter = express.Router()
const {checkForExistingChat, createChat, getChatsByUserId, getChatById} = require('../db/chat')
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