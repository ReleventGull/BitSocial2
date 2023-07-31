const client = require('./index')

const createChat = async({user1, user2}) => {
    try {
        const {rows: [chat]} = await client.query(`
            INSERT INTO chat (user_id_1, user_id_2)
            VALUES($1, $2)
            RETURNING *
        `, [user1, user2])  
        return chat
    }catch(error) {
        console.error("There was an error creating chat", error)
        throw error
    }
}

const getChatsByUserId = async(userId) => {
    try {
        const {rows: chats} = await client.query(`
        SELECT chat.*, users.username
        FROM chat
        JOIN users ON CASE
            WHEN chat.user_id_1 = $1 THEN chat.user_id_2 = users.id
            ELSE chat.user_id_1 = users.id
        END
        WHERE chat.user_id_1 = $1 OR chat.user_id_2 = $1
        `, [userId])
        for(let i = 0; i < chats.length; i++) {
            if(chats[i].user_id_1 == userId) {
                delete chats[i].user_id_1
            }else {
                delete chats[i].user_id_2
            }
        }
        console.log("Chat in database", chats)
        return chats
    }catch(error) {
        console.error("There was an error getting the user chats by the user id", error)
        throw error
    }
}

const getChatById = async({userId, id}) => {
    try {
        const {rows: [chat]} = await client.query(`
        SELECT chat.*, users.username
        FROM chat
        JOIN users ON CASE
            WHEN chat.user_id_1 = $1 THEN chat.user_id_2 = users.id
            ELSE chat.user_id_1 = users.id
        END
        WHERE chat.id=$2
        `, [userId, id])
        return chat
    }catch(error) {
        console.error("There was an error getting the user chats by the user id", error)
        throw error
    }
}
const checkForExistingChat = async({user1Id, user2Id}) => {
    try {
        const {rows: [chat]} = await client.query(`
            SELECT id FROM chat
            WHERE user_id_1=$1 AND user_id_2=$2
            OR user_id_1=$3 AND user_id_2=$4
        `, [user1Id, user2Id, user2Id, user1Id])
        return chat
    }catch(error) {
        console.error("There was an error getting use chat by boths ids", error)
        throw error
    }
}

const deleteChatById = async (id) => {
    try {
        const {rows: [chat]} = await client.query(`
            DELETE 
            FROM chat 
            WHERE id=$1
            RETURNING *
        `, [id])
        return chat
    }catch(error) {
        console.error("There was an error deleteing chat by id", error)
        throw error
    }
}

const deleteMessageByChatId = async (id) => {
    try {
        const {rows: [message]} = await client.query(`
            DELETE 
            FROM message 
            WHERE chat_id=$1
            RETURNING *
        `, [id])
        return message
    }catch(error) {
        console.error("There was an error deleteing chat by id", error)
        throw error
    }
}
module.exports = {
    createChat,
    getChatsByUserId,
    checkForExistingChat,
    createChat,
    deleteChatById,
    deleteMessageByChatId,
    getChatById
}