const client = require('./index')

const buildTables = async() => {
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(15) NOT NULL,
            password VARCHAR(20) NOT NULL
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
        DROP TABLE IF EXISTS users
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