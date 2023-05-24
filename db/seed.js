const client = require("./index") ;
const {buildTables, dropTables} = require('./init')
const {createChat} = require('./chat')
const {createMessage} = require('./message')
const {createUser} = require('./users')

const seedData = async() => {
    const user1 = await createUser({username: "Jaron", password: "Jon120"})
    const user2 = await createUser({username: "Adam", password: "tractor901"})
    const chat = await createChat({user1: user1.id, user2: user2.id})
    const message1 = await createMessage({chatId: chat.id, userId: user1.id, message:"Hi!", date: 'now'})
    console.log(chat)
}




const rebuildDb = async() => {
    client.connect()
    await seedData()
    await dropTables()
    await buildTables()
}

rebuildDb()
.catch(error => console.error(error))
.then(() => client.end())