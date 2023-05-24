const client = require('./index')

const createMessage = async({chatId, userId, message, date}) => {
    try {
        console.log('data', date)
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
        console.log("Chatid", chatId)
        const {rows} = await client.query(`
        SELECT * FROM message
        WHERE message.chat_id=$1
        `, [chatId])
        console.log(rows)
        return rows
    }catch(error){
        console.error("There was an error getting the chat messages by the chatId", error)
        throw error
    }
}


module.exports = {
    createMessage,
    getChatMessagesByChatId
}