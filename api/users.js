const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {checkExistingUserByUsername, createUser, checkPassword, getUserByUsername} = require('../db/users')

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

userRouter.post('/login', async(req, res, next) => {
    try {
        console.log("I get to login")
        const {username, password} = req.body
        console.log("Body: ", req.body)
        if(!username || !password) {
            res.status(401).send({
                error: "MissingCredentials",
                message: "Please fill out all the fields"
            })
        }else {
            const checkUsername = await checkExistingUserByUsername(username)
            if (!checkUsername) {
                res.status(401).send({
                    error: "IncorrectCredentials",
                    message: "Your username of password is incorrect"
                })
            }else {
                const passwordCheck = await checkPassword({username: username, password: password})
                if(!passwordCheck) {
                    res.status(401).send({
                        error: "IncorrectCredentials",
                        message: "Your username of password is incorrect"
                    })
                }else {
                    const user = await getUserByUsername(username)
                    const token = jwt.sign(user, JWT_SECRET)
                    res.send({
                        message: "Success, Welcome back!",
                        token: token,
                        user: user
                    })
                }
            }
        }
        
    }catch(error){
        console.error("There was an error loggin the user in", error)
        throw error
    }
})


module.exports = userRouter