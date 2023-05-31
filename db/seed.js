const client = require("./index") ;
const {buildTables, dropTables} = require('./init')
const {createChat, getUserChatByUserId} = require('./chat')
const {createMessage, getChatMessagesByChatId} = require('./message')
const {createUser} = require('./users')
const {createFriend} = require('./friends')


const seedData = async() => {
    const user1 = await createUser({username: "Jaron", password: "Jon120"})
    const user2 = await createUser({username: "Adam", password: "tractor901"})
    const user3 = await createUser({username: "David", password: "trok2"})
    
    const friend1 = await createFriend({user1: user1.id, user2:user2.id})
    console.log(friend1)
    const chat1 = await createChat({user1: user1.id, user2: user2.id})
    const chat2 = await createChat({user1: user1.id, user2: user3.id})
    
    const message1 = await createMessage({chatId: chat1.id, userId: user1.id, message:"Hi!", date: 'now'})
    const message2 = await createMessage({chatId: chat1.id, userId: user2.id, message:"Hi jaron", date: 'now'})

    const message3 = await createMessage({chatId: chat2.id, userId: user1.id, message:"Hi david :D", date: 'now'})
    const message4 = await createMessage({chatId: chat2.id, userId: user3.id, message:"Hi jaron :)", date: 'now'})

    
    
    


    const chat1Messages = await getChatMessagesByChatId(chat1.id)

    const chat2Messages = await getChatMessagesByChatId(chat2.id)
}




const rebuildDb = async() => {
    client.connect()
    await dropTables()
    await buildTables()
}

rebuildDb()
.catch(error => console.error(error))
.then(() => client.end())