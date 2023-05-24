const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userRouter = require('./users')

// router.use((req, res, next) => {
//     const auth = req.header("Authorization")
//     if(auth) {
//             const [bearer, token] = auth.split(" ")
//             if(bearer == 'Bearer') {
//                 try {
//                     const user = jwt.verify(token)
//                     req.id = user.id
//                 }catch(error) {
//                     console.error("there was an error verifying the json web token", error)
//                     throw error
//                 }
//             }else {
//                 next({
//                     error: "AuthorizationError",
//                     message: "Authorization header must start with Bearer"
//                 })
//             }
           
//     }else {
//         next()
//     }
// })

router.use('/users', userRouter)

module.exports = router