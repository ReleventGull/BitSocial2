const client = require('./index')

const buildTables = async() => {
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(15) NOT NULL,
            password VARCHAR(20) NOT NULL
        );
        CREATE TABLE chat (
            id SERIAL PRIMARY KEY,
            user_id_1 INTEGER REFERENCES users(id),
            user_id_2 INTEGER REFERENCES users(id)
        );
        CREATE TABLE message (
            id SERIAL PRIMARY KEY,
            chat_id INTEGER REFERENCES chat(id),
            user_id INTEGER REFERENCES users(id),
            message VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL
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