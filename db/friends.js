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
            VALUES ($1, $2)
            RETURNING *
        `, [user1, user2])
        return request
    }catch(error) {
        console.error('There was an erroring creating a friend request', error)
        throw error
    }
}

const getRequestByUserId = async({user1, user2}) => {
    try {
        const {rows: [request]} = await client.query(`
            SELECT * from friend_request
            WHERE user_sent_id = $1 AND user_recieved_id=$2
        `, [user1, user2])
        return request
    }catch(error) {
        console.error("There was an error getting request by user id", error)
        throw error
    }
}

const getFriendByIds = async({user1, user2}) => {
    try {
        const {rows: [friend]} = await client.query(`
            SELECT * FROM friends
            WHERE user_1_id=$1 AND user_2_id=$2 OR user_1_id = $3 AND user_2_id=$4
        `, [user1, user2, user2, user1])
        return friend
    }catch(error) {
        console.error("There was an error getting friends by ids", error)
        throw error
    }
}

const deleteFriendRequest = async ({user1, user2}) => {
    try {
        const {rows: [request]} = await client.query(`
        DELETE from friend_request
        WHERE user_sent_id=$1 AND user_recieved_id=$2 OR user_sent_id = $3 AND user_recieved_id=$4
        RETURNING *
        `, [user1, user2, user2, user1])
        return request
    }catch(error) {
        console.error("There was an error deleting the friends request", error)
        throw error
    }
}

const getFriendRequestById = async(id) => {
    try {
        const {rows: requests} = await client.query(`
            SELECT friend_request.*, users.username as userSent
            FROM friend_request
            JOIN users ON friend_request.user_sent_id=users.id
            WHERE
            user_recieved_id=$1
        `, [id])
        return requests
    }catch(error) {
        console.error("There was an error getting the friend request by id")
        throw error
    }
}

const getFriendsByUserId = async(userId) => {
    try {
        const {rows: friends} = await client.query(`
            SELECT friends.*, users.username
            FROM friends
            JOIN users ON
            CASE
                WHEN friends.user_1_id=$1 THEN friends.user_2_id=users.id
                ELSE friends.user_1_id=users.id
            END
            WHERE friends.user_1_id=$2 OR friends.user_2_id=$3
        `, [userId,userId,userId])
        return friends
    }catch(error) {
        console.error("There was an error getting friends by user id", error)
        throw error
    }
}

module.exports = {
    createFriend,
    createFriendRequest,
    getRequestByUserId,
    getRequestByUserId,
    getFriendByIds,
    createFriend,
    deleteFriendRequest,
    getFriendRequestById,
    getFriendsByUserId
}