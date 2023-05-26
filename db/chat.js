const client = require('./index')

const createChat = async({user1, user2}) => {
    try {
        const {rows: [chat]} = await client.query(`
            INSERT INTO chat (user_id_1, user_id_2)
            VALUES($1, $2)
            RETURNING *;
        `, [user1, user2])  
        return chat
    }catch(error) {
        console.lod("There was an error creating chat", error)
        throw error
    }
}

const getUserChatByUserId = async(userId) => {
    try {
        const {rows} = await client.query(`
        SELECT chat.*, users.username
        FROM chat
        JOIN users ON users.id=chat.user_id_2
        WHERE chat.user_id_1=$1
        `, [userId])
        return rows
    }catch(error) {
        console.error("There was an error getting the user chats by the user id", error)
        throw error
    }
}

const checkForExistingChat = async({user1Id, user2Id}) => {
    try {
        console.log(user1Id, user2Id)
        const {rows: [chat]} = await client.query(`
            SELECT id FROM chat
            WHERE user_id_1=$1 AND user_id_2=$2
            OR user_id_1=$3 AND user_id_2=$4
        `, [user1Id, user2Id, user2Id, user1Id])
        console.log("CHat here", chat)
        return chat
    }catch(error) {
        console.error("There was an error getting use chat by boths ids", error)
        throw error
    }
}


module.exports = {
    createChat,
    getUserChatByUserId,
    checkForExistingChat,
    createChat
}