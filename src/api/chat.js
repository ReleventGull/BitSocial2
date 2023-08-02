

const {BASE_URL = 'http://localhost:3000/api'} = process.env



export const getUserChats = async(token) => {
    try {
        const response = await fetch(`${BASE_URL}/chat/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        }).then(result => result.json())
        return response 
    }catch(error) {
        console.error("There was an error creating the chat", error)
        throw error
    }
}

export const getChatById = async({token, chatId}) => {
    try {
        const response = await fetch(`${BASE_URL}/chat/${chatId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        }).then(result => result.json())
        return response 
    }catch(error) {
        console.error("There was an error creating the chat", error)
        throw error
    }
}
