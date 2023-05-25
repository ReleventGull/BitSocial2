const client = require('./index')

const createUser = async({username, password}) => {
    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING id, username
        `, [username, password])
        return user
    }catch(error) {
        console.error("There was an error creating user", error)
        throw error
    }
}

const getUserByUsername = async(username) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT users.username, users.id
        FROM users
        WHERE username=$1
        `, [username])
        return username
    }catch(error) {
        console.error("There was an error getting the user by their username", error)
        throw error
    }
}
const checkExistingUserByUsername = async(username) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE users.username=$1
        `, [username])
        return user
    }catch(error) {
        console.error("There was an error checking if user exists by username", error)
        throw error
    }
}

const checkPassword = async ({username, password}) => {
    try {
        
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE users.username=$1
        `, [username])
        console.log("I got here to the end")
        if(user.password !== password) {
            return false
        }else {
            return true
        }
    }catch(error) {
        console.error("There was an error checking the password", error)
        throw error
    }
}

const getUsersFromSearch = async({searchQuery, pagination}) => {
    try {
        console.log("Top hoe")
        const {rows: users} = await client.query(`
            SELECT * FROM users
            WHERE LOWER(users.username) LIKE LOWER('%${searchQuery}%')
            Limit 10
        `)
        console.log('users here', users)
        return users
    }catch(error) {
        console.error("There was an error getting users", error)
        throw error
    }
}


module.exports = {
    createUser,
    checkExistingUserByUsername,
    checkPassword,
    getUserByUsername,
    getUsersFromSearch
}