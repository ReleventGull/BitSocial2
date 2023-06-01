const express = require('express')
const friendRouter = express.Router()
const {getRequestByUserId, getFriendByIds, createFriend, createFriendRequest, deleteFriendRequest} = require('../db/friends')
friendRouter.post('/sendRequest', async(req, res, next) => {
    try {
        const {user1, user2} = req.body
        const checkIfFriends = await getFriendByIds({user1: user1, user2: user2})
        if(checkIfFriends) {
            res.status(401).send({
                error:"AlreadyFriends",
                message:"This user is already your friend"
            })
        }else {
            const checkDoubleRequest = await getRequestByUserId(user1)
            if(checkDoubleRequest) {
                res.status(401).send({
                    error: "FrAlreadyExists",
                    message: "You already have a pending request for this user"
                })
            }else {
                const checkRequest = await getRequestByUserId(user2)
                if(checkRequest) {
                    let newFriend = await createFriend({user1: user1, user2: user2})
                    await deleteFriendRequest({user1: user1, user2: user2})
                    res.send({
                        message: "You are now friends"
                    })
                }else {
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

module.exports = friendRouter