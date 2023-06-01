const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userRouter = require('./users')
const chatRouter = require('./chat')
const friendRouter = require('./friend')
const {JWT_SECRET} = process.env
router.use((req, res, next) => {
    const auth = req.header("Authorization")
    console.log("Auth", auth)
    if(auth) {
            const [bearer, token] = auth.split(" ")
            if(bearer == 'Bearer') {
                try {
                    const user = jwt.verify(token, JWT_SECRET)
                    req.user = user
                    next()
                }catch(error) {
                    console.error("there was an error verifying the json web token", error)
                    throw error
                }
            }else {
                next({
                    error: "AuthorizationError",
                    message: "Authorization header must start with Bearer"
                })
            }
           
    }else {
        next()
    }
})

router.use('/users', userRouter)
router.use('/chat', chatRouter)
router.use('/friends', friendRouter)

module.exports = router



