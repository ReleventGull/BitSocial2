const client = require("./index") ;
const {buildTables, dropTables} = require('./init')


const rebuildDb = async() => {
    client.connect()
    await dropTables()
    await buildTables()
}

rebuildDb()
.catch(error => console.error(error))
.then(() => client.end())