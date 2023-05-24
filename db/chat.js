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

module.exports = {
    createChat
}