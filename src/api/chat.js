

const {BASE_URL = 'http://localhost:3000/api'} = process.env

export const createChat = async({token, user1, user2}) => {
    try {
        const response = await fetch(`${BASE_URL}/chat/create`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user1: user1,
                user2: user2
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error creating the chat", error)
        throw error
    }
}

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