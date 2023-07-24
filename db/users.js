const client = require('./index')

const createUser = async({username, password}) => {
    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users (username, password, date_joined)
        VALUES ($1, $2, $3)
        RETURNING id, username
        `, [username, password, new Date()])
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
        return user
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

const getUsersFromSearch = async({searchQuery, userId, pagination}) => {
    try {
        const {rows: users} = await client.query(`
            SELECT * FROM users
            WHERE LOWER(users.username) LIKE LOWER('%${searchQuery}%') AND users.id!=$1
            Limit 10
        `, [userId])
        return users
    }catch(error) {
        console.error("There was an error getting users", error)
        throw error
    }
}

const getUserById = async(id) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT users.id, users.username, users.date_joined
        FROM users
        WHERE id=$1
        `, [id])
        return user
    }catch(error){
        console.error("There was an error getting the user by the id", error)
        throw error
    }
}
module.exports = {
    createUser,
    checkExistingUserByUsername,
    checkPassword,
    getUserByUsername,
    getUsersFromSearch,
    getUserById
}