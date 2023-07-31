const client = require('./index')

const buildTables = async() => {
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) NOT NULL,
            password VARCHAR(20) NOT NULL,
            date_joined VARCHAR(255) NOT NULL
        );
        CREATE TABLE chat (
            id SERIAL PRIMARY KEY,
            user_id_1 INTEGER REFERENCES users(id),
            user_id_2 INTEGER REFERENCES users(id)
        );
        CREATE TABLE message (
            id SERIAL PRIMARY KEY,
            chat_id INTEGER REFERENCES chat(id) NOT NULL,
            user_id INTEGER REFERENCES users(id) NOT NULL,
            message VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL
        );
        CREATE TABLE friends (
            id SERIAL PRIMARY KEY,
            user_1_id INTEGER REFERENCES users(id) NOT NULL,
            user_2_id INTEGER REFERENCES users(id) NOT NULL,
            date_added VARCHAR(40) NOT NULL
        );
        CREATE TABLE friend_request (
            id SERIAL PRIMARY KEY,
            user_sent_id INTEGER REFERENCES users(id),
            user_recieved_id INTEGER REFERENCES users(id),
            unread BOOLEAN DEFAULT TRUE
        );
        `)
        console.log("Finished building tables")
    }catch(error) {
        console.error("There was an error building the tables", error)
        throw error
    }
}

const dropTables = async() => {
    try {
        await client.query(`
        DROP TABLE IF EXISTS friend_request;
        DROP TABLE IF EXISTS friends;
        DROP TABLE IF EXISTS message;
        DROP TABLE IF EXISTS chat;
        DROP TABLE IF EXISTS users;
        `)
        console.log('Finished dropping tables')
    }catch(error) {
        console.error("There was an error dropping the tables", error)
        throw error
    }
}


module.exports = {
    dropTables, 
    buildTables
}