
const requireUser = (req, res, next) => {
    if(req.user) {
        next()
    }else {
        res.status(401).send({
            error: "You are unauthroized",
            message: "You are not allowed to perform that action"
        })
    }
}

module.exports = requireUser