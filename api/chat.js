const express = require('express')
const chatRouter = express.Router()
const {checkForExistingChat, createChat} = require('../db/chat')
const {getUserById} = require('../db/users')
const requireUser = require('./requireUser')

chatRouter.post('/create', requireUser, async(req, res, next) => {
    try {
        
        const {id} = req.user
        const {user2} = req.body
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
                    await createChat({user1: id, user2: user2})
                    res.send({
                        message: "Success"
                    })
                }
                
            }

        }
    }catch(error) {
        console.error("There was an error creating chat in chatRouter", error)
        throw error
    }
})

module.exports = chatRouter