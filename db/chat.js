const client = require('./index')
const {getUnreadMessageCount} = require('./message')

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
const createChatView = async({userId, chatId}) => {
    try {
        const {rows: [view]} = await client.query(`
            INSERT INTO chatView(user_id, chat_id)
            VALUES($1, $2)
            RETURNING *
        `, [userId, chatId])
        return view
    }catch(error) {
        console.error("There was an error setting chat to view", error)
        throw error
    }
}
const getChatsByUserId = async(userId) => {
    try {
        const {rows: chats} = await client.query(`
        SELECT chat.*, users.username, chatView.view, user_profile_color.color_code AS color
        FROM chat
        JOIN users ON CASE
            WHEN chat.user_id_1 = $1 THEN chat.user_id_2 = users.id
            ELSE chat.user_id_1 = users.id
        END
        JOIN user_profile_color ON CASE
            WHEN chat.user_id_1 = $1 THEN chat.user_id_2 = user_profile_color.user_id
            ELSE chat.user_id_1 = user_profile_color.user_id
        END
        JOIN chatView ON chat.id=chatView.chat_id AND chatView.user_id = $1
        WHERE 
            (
            chat.user_id_1 = $1 OR chat.user_id_2 = $1
            )
            AND 
            (
            chatView.view=true
            )
            
        `, [userId])
        console.log('chats here', chats[0])
        for(let i = 0; i < chats.length; i++) {
            if(chats[i].user_id_1 == userId) {
                delete chats[i].user_id_1
            }else {
                delete chats[i].user_id_2
            }
        }
        for(let i = 0; i < chats.length; i++) {
            let count = await getUnreadMessageCount({userId: userId, chatId: chats[i].id})
            chats[i]['count'] = Number(count.count)
        }
        return chats
    }catch(error) {
        console.error("There was an error getting the user chats by the user id", error)
        throw error
    }
}

const getChatById = async({userId, id}) => {
    try {
        const {rows: [chat]} = await client.query(`
        SELECT chat.*, users.username, user_profile_color.color_code AS color
        FROM chat
        JOIN users ON CASE
            WHEN chat.user_id_1 = $1 THEN chat.user_id_2 = users.id
            ELSE chat.user_id_1 = users.id
        END
        JOIN user_profile_color ON CASE
            WHEN chat.user_id_1 = $1 THEN chat.user_id_2 = user_profile_color.user_id
            ELSE chat.user_id_1 = user_profile_color.user_id
        END
        WHERE chat.id=$2
        `, [userId, id])
        let count = await getUnreadMessageCount({userId: userId, chatId: chat.id})
        if(!count) {
            chat['count'] = 0
        }else {
            chat['count'] = count.count
        }
        
        
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

const createMessage = async ({chatId, userId, message}) => {
    try {
        const {rows: [msg]} = await client.query(`
            INSERT INTO message (chat_id, user_id, message, date)
            VALUES($1, $2, $3, $4)
            RETURNING id
        `, [chatId, userId, message, new Date()])
        return msg
    }catch(error) {
        console.error("ther was an error creating  message", error)
        throw error
    }
}
const getMessagesByChatId = async(id) => {
    try {
        const {rows: messages} = await client.query(`
            SELECT message.*, users.username
            FROM message
            JOIN users ON users.id=message.user_id
            WHERE message.chat_id=$1
            ORDER BY message.id ASC
        `, [id])
        return messages
    }catch(error) {
        console.error("There was an error getting message by id", error)
        throw error
    }
}

const getMessageById = async({id}) => {
    try {
        const {rows: [message]} = await client.query(`
        SELECT message.id AS "message_id", message.chat_id, message.message, message.user_id AS "user_id", message.date, users.username, chat.user_id_1, chat.user_id_2
        FROM message
        JOIN users ON users.id=message.user_id
        JOIN chat ON message.chat_id=chat.id
        WHERE message.id=$1
        `, [id])

        let userReceiving
        if(message.user_id == message.user_id_1) {
            userReceiving = message.user_id_2
        }else {
            userReceiving = message.user_id_1
        }
        message['user_receiving'] = userReceiving
        delete message.user_id_1
        delete message.user_id_2
        return message
    }catch(error) {
        console.error("There was an error getting message by id", error)
        throw error
    }
}

const getChatView = async({userId, chatId}) => {
    try {
        const {rows: [view]} = await client.query(`
            SELECT * FROM chatView
            WHERE user_id=$1 AND chat_id = $2
        `, [userId, chatId])
        return view
    }catch(error) {
        console.error("There was an error getting message by id", error)
        throw error
    }
}

const setView = async({userId, chatId, boolean}) => {
    try {
        const {rows: [view]} = await client.query(`
            UPDATE chatView
            SET view=$3
            WHERE user_id=$1 AND chat_id = $2
            RETURNING *
        `, [userId, chatId, boolean])
        console.log("Set view got called for some fucking reason", view, boolean)
        return view
    }catch(error) {
        console.error("There was an error getting message by id", error)
        throw error
    }
}


const getChatIdByUserIds = async({user1, user2}) => {
    try {
        console.log(user1, user2, 'am I getting hit!@?')
        const {rows: [id]} = await client.query(`
            SELECT id from chat
            WHERE user_id_1=$1 AND user_id_2=$2 OR user_id_1=$2 AND user_id_2=$1
        `, [user1, user2])
        console.log("ID after query", id)
        return id
    }catch(error) {
        console.error("There was an error getting chat by user ids")
        throw error
    }
}

const deleteChatView = async(id) => {
    try {
        const {rows: deleted} = await client.query(`
        DELETE FROM chatView 
        WHERE chat_id=$1 
        RETURNING *
        `, [id])
        return deleted
    }catch(error) {
        console.error("There was an error deleting chatView", error)
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
    getChatById,
    createMessage,
    getMessageById,
    getMessagesByChatId,
    createChatView,
    getChatView,
    setView,
    getChatIdByUserIds,
    deleteChatView
}