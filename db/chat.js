const client = require('./index')

const createChat = async({id, user1, user2}) => {
    try {
        const {rows: [chat]} = await client.query(`
            INSERT INTO chat (id, user_id_1, user_id_2)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [id, user1, user2])  
        return chat
    }catch(error) {
        console.lod("There was an error creating chat", error)
        throw error
    }
}

module.exports = {
    createChat
}