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

const createFriendRequest = async({user1, user2}) => {
    try {
        const {rows: request} = await client.query(`
            INSERT INTO friend_request (user_sent_id, user_recieved_id)
            VALUE ($1, $2)
            RETURNING *
        `, [user1, user2])
        return request
    }catch(error) {
        console.error('There was an erroring creating a friend request', error)
        throw error
    }
}

module.exports = {
    createFriend,
    createFriendRequest
}