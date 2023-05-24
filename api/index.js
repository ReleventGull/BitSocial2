const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
    const auth = req.headers()
    if (auth) {
        try {
            const [, token] = auth.split(" ")
            const user = jwt.verify(token)
            req.id = user.id
        }catch(error) {
            console.error("there was an error verifying the json web token", error)
            throw error
        }
    }else {
        next()
    }
})