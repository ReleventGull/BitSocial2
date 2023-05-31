const client = require('./index')

const createFriend = async({user1, user2}) => {
    try {
        const {rows: friend} = await client.query(`
            INSERT INTO friends (user_1_id, user_2_id, date_added)
            VALUES($1, $2, $3) 
            RETURNING *
        `, [user1, user2, new Date()])
        return friend
    }catch(error) {
        console.error("There was an error creating a friends tables", error)
        throw error
    }
}

module.exports = {
    createFriend
}