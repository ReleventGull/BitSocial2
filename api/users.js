const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {checkExistingUserByUsername, createUser} = require('../db/users')

userRouter.post('/register', async(req, res, next) => {
    try {
        const {username, password, password2} = req.body
        if (!username || !password || !password2){
                res.send( {
                    error: "MissingCredentials",
                    message: "Please fill out all the fields"
                })
        }else {
            const exisitingUser = await checkExistingUserByUsername(username)
            if(exisitingUser) {
                res.status(401).send({
                    error: "UserExists",
                    message: "A user by that username already exists"
                })
            }else if (password !== password2) {
                res.status(401).send({
                    error: "MismatchCredentials",
                    message: "Your passwords do not match"
                })
            }else {
                const user = await createUser({username: username, password: password})
                const token = jwt.sign(user, JWT_SECRET)
                res.send({
                    message: "Success, Welcome!",
                    token: token,
                    user: user
                })
            }
        }

    }catch(error) {
        console.error("There was an error registering the user", error)
        throw error
    }
})


module.exports = userRouter