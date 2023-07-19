const client = require('./index')

const createFriend = async({user1, user2}) => {
    try {
        const {rows: [friend]} = await client.query(`
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

const deleteFriendRequest = async (id) => {
    try {
        const {rows: [request]} = await client.query(`
        DELETE from friend_request
        WHERE id=$1
        RETURNING *
        `, [id])
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

const getFriendById = async({id, userId}) => {
    try {
        const {rows: [friend]} = await client.query(`
        SELECT friends.*, users.username
        FROM friends
        JOIN users ON 
            CASE
                WHEN friends.user_1_id=$2 THEN friends.user_2_id=users.id
                ELSE friends.user_1_id=users.id
            END
        WHERE friends.id=$1
        `, [id, userId])
        console.log('Firned here mf', friend)
        return friend
    }catch(error) {
        console.error("There was an error getting friedn by id", error)
        throw error
    }
}

const getPendingRequest = async(userId) => {
    try {
        const {rows: pending} = await client.query(
            `
            SELECT friend_request.*, users.username
            FROM friend_request
            JOIN users ON friend_request.user_recieved_id=users.id
            WHERE friend_request.user_sent_id=$1
            `, [userId])
            return pending
    }catch(error) {
        console.error("There was an error getting pending friend request", error)
        throw error
    }
}

const getFriendsCount = async (userId) => {
    try {
        const {rows} = await client.query(`
            SELECT COUNT(friends.id) 
            FROM
            friends
            WHERE user_1_id=$1 OR user_2_id=$2
        `, [userId, userId])
        return rows
    }catch(error) {
        console.error("There was an error getting the count" , error) 
        throw error
    }
}

const getRequestCount = async (userId) => {
    try {
        const {rows} = await client.query(`
            SELECT COUNT(friend_request.id)
            FROM friend_request
            WHERE user_recieved_id = $1
        `, [userId])
        return rows
    }catch(error) {
        console.error("There was an error getting request count", error)
        throw error
    }
}

const getPendingCount = async (userId) => {
    try {
        const {rows} = await client.query(`
            SELECT COUNT(friend_request.id)
            FROM friend_request
            WHERE user_sent_id = $1
        `, [userId])
        return rows
    }catch(error) {
        console.error("There was an error getting pending count", error)
        throw error
    }
}

const getUnreadFriendRequestByUserId = async(id) => {
    try {
        const {rows: [count]} = await client.query(`
        SELECT COUNT(friend_request.id)
        FROM friend_request
        WHERE user_recieved_id = $1 AND unread = true
        `, [id])
        return count
    }catch(error) {
        console.error("There was an error getting unreadFriendRequest", error)
        throw error
    }
}

const getRequestByBothIds = async({user1, user2}) => {
    try {
        const {rows: [request]} = await client.query(`
            SELECT friend_request.*, users.username AS usersent
            from friend_request
            JOIN users ON friend_request.user_sent_id=users.id
            WHERE friend_request.user_sent_id=$1 AND friend_request.user_recieved_id=$2
        `, [user1, user2])
        return request
    }catch(error) {
        console.error("There was an error getting request by both ids", error)
        throw error
    }
}

const deleteFriendById = async(id) => {
    try {
        const {rows: [friend]} = await client.query(`
        DELETE FROM friends
        WHERE
        id=$1
        RETURNING *
        `, [id])
        console.log("friend after delete", friend)
        return friend
    }catch(error) {
        console.error("There was an error deleting the friend request", error) 
        throw error
        
    }
}

const updateReadStatus = async(userId) => {
    try {
        const {rows} = client.query(`
        UPDATE friend_request
        SET unread=false
        WHERE user_recieved_id=$1
        `, [userId])
    }catch(error) {
        console.error("There was an error updating the read status", error)
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
    getFriendsByUserId,
    getPendingRequest,
    getFriendsCount,
    getRequestCount,
    getPendingCount,
    getUnreadFriendRequestByUserId,
    getRequestByBothIds,
    getFriendById,
    deleteFriendById,
    updateReadStatus
}