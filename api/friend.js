const express = require('express')
const friendRouter = express.Router()
const requireUser = require('./requireUser')
const {getRequestByUserId, getFriendByIds, createFriend, createFriendRequest, deleteFriendRequest, getFriendRequestById} = require('../db/friends')

friendRouter.post('/sendRequest', requireUser, async(req, res, next) => {
    try {
        const {user2} = req.body
        const {id: user1} = req.user
        console.log(user2, user1)
        console.log(user1)
        if(user2 == user1) {
            res.send({
                error: "UserMatch",
                message: "You can not friend yourself"
            })
            return
        }
        const checkIfFriends = await getFriendByIds({user1: user1, user2: user2})
        if(checkIfFriends) {
            res.status(401).send({
                error:"AlreadyFriends",
                message:"This user is already your friend"
            })
        }else {
            const checkRequest = await getRequestByUserId({user1: user2, user2: user1})
            if(checkRequest) {
                let newFriend = await createFriend({user1: user1, user2: user2})
                await deleteFriendRequest({user1: user1, user2: user2})
                res.send({
                    message: "You are now friends"
                })
            }else {
                const checkDoubleRequest = await getRequestByUserId({user1: user1, user2: user2})
                if(checkDoubleRequest) {
                    res.status(401).send({
                        error: "FrAlreadyExists",
                        message: "You already have a pending request for this user"
                    })
                }else {
                    console.log(user1, user2)
                    const request = createFriendRequest({user1: user1, user2: user2})
                    res.send({
                        message: "Friend request sent!"
                    })
                }
            }
        }
        
        

        //Check to see if the other user already has a request'
    }catch(error) {
        console.error("There was an error sending a request", error)
        throw error
    }
})

friendRouter.get('/requests', requireUser, async(req, res, next) => {
    try {
        const {id} = req.user
        const requests = await getFriendRequestById(id)
        console.log('requests', requests)
        if (requests) {
            res.send(
                requests
            )
        }else {
            res.send({
                message: "You have no pending friend requests"
            })
        }
    }catch(error) {
        console.error("There was an error getting the users request", error)
        throw error
    }
})


module.exports = friendRouter