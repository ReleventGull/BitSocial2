const client = require("./index") ;
const {buildTables, dropTables} = require('./init')
const {createChat, getUserChatByUserId} = require('./chat')
const {createMessage} = require('./message')
const {createUser} = require('./users')


const seedData = async() => {
    const user1 = await createUser({username: "Jaron", password: "Jon120"})
    const user2 = await createUser({username: "Adam", password: "tractor901"})
    const user3 = await createUser({username: "David", password: "trok2"})
    
    
    const chat = await createChat({user1: user1.id, user2: user2.id})
    const chat2 = await createChat({user1: user1.id, user2: user3.id})
    const message1 = await createMessage({chatId: chat.id, userId: user1.id, message:"Hi!", date: 'now'})

    const chats = await getUserChatByUserId(user1.id)
    console.log(chats)
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