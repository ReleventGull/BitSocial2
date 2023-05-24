const client = require('./index')

const createMessage = async({chatId, userId, message, date}) => {
    try {
        const {rows: [message]} = await client.query(`
        INSERT INTO message (chat_id, user_id, message, date)
        VALUES ($1, $2, $3, $4)
        RETURNING *   
        `, [chatId, userId, message, date])
        return message
    }catch(error) {
        console.error("There was an error creating a message", error)
        throw error
    }
}

module.exports = {
    createMessage
}