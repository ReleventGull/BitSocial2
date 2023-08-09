

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

export const sendMessage = async({token, chatId, message}) => {
    try {
        const response = await fetch(`${BASE_URL}/chat/send/${chatId}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        }).then(result => result.json())
        return response 
    }catch(error) {
        console.error("There was an error creating the chat", error)
        throw error
    }
}

export const getMessages = async({token, chatId}) => {
    try {
        const response = await fetch(`${BASE_URL}/chat/messages/${chatId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
        }).then(result => result.json())
        return response 
    }catch(error) {
        console.error("There was an error creating the chat", error)
        throw error
    }
}

export const updateMessage = async({token, chatId})=> {
    try {
        const response = await fetch(`${BASE_URL}/chat/update/${chatId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
        }).then(result => result.json())
        return response 
    }catch(error) {
        console.error("There was an error creating the chat", error)
        throw error
    }
}