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


chatRouter.post('/create', requireUser, async(req, res, next) => {
    try {
        
        const {id} = req.user
        let {user1, user2} = req.body
        
        if(id == user2) {
            user2 = user1
        }
        
        if(id == user2 || !user2) {
            res.status(401).send({
                error: "InvalidStatement",
                message: "InvalidId"
            })
        }else{
            const checkUser = await getUserById(user2)
            if(!checkUser) {
                res.status(401).send({
                    error: "UserDoesn'tExists",
                    message: 'User you specified does not exists'
                })
            }else {
                const checkExisiting = await checkForExistingChat({user1Id: id, user2Id: user2})
                if(checkExisiting) {
                    res.status(401).send({
                        error: 'ChatAlreadyExists',
                        message: 'Use already has an open chat with said user2'
                    })
                }else { 
                    const chat = await createChat({user1: id, user2: user2})
                    res.send(
                        chat
                    )
                }
                
            }

        }
    }catch(error) {
        console.error("There was an error creating chat in chatRouter", error)
        throw error
    }
})



module.exports = chatRouter