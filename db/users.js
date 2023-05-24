const client = require('./index')

const createUser = async() => {
    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
        `, [username, password])
        return user
    }catch(error) {
        console.error("There was an error creating user", error)
        throw error
    }
}

module.exports = {
    createUser
}