const client = require('./index')

const createMessage = async({chatId, userId, message, date}) => {
    try {
        const {rows: [msg]} = await client.query(`
        INSERT INTO message (chat_id, user_id, message, date)
        VALUES ($1, $2, $3, $4)
        RETURNING *   
        `, [chatId, userId, message, date])
        return msg
    }catch(error) {
        console.error("There was an error creating a message", error)
        throw error
    }
}

const getChatMessagesByChatId = async(chatId) => {
    try {
        const {rows} = await client.query(`
        SELECT * FROM message
        WHERE message.chat_id=$1
        `, [chatId])
        return rows
    }catch(error){
        console.error("There was an error getting the chat messages by the chatId", error)
        throw error
    }
}

const getUnreadMessageCount = async({userId, chatId}) =>{
    try {
        const {rows: [count]} = await client.query(`
        SELECT COUNT(unread) FROM message
        WHERE user_id!=$1 AND chat_id=$2 AND unread=true
        `, [userId, chatId])
        return count
    }catch(error) {
        console.error("There was an error gettin un read message count by id", error)
        throw error
    }
}

const setMessageToRead = async({userId, chatId}) =>{
    try {
        const {rows: [count]} = await client.query(`
            UPDATE message
            SET unread=false
            WHERE user_id!=$1 AND chat_id=$2
            RETURNING *;
        `, [userId, chatId])
        return count
    }catch(error) {
        console.error("There was an error gettin un read message count by id", error)
        throw error
    }
}


module.exports = {
    createMessage,
    getChatMessagesByChatId,
    getUnreadMessageCount,
    setMessageToRead,
}