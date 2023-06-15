

const {BASE_URL = 'http://localhost:3000/api'} = process.env

export const login = async({username, password}) => {
    try {
        console.log(username)
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error loggin in the user in the frontend", error)
        throw error
    }
}

export const register = async({username, password, password2}) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, 
                password,
                password2
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error registering the user", error)
        throw error
    }
}

export const searchUsers = async({query, token}) => {
    try {
        const response = await fetch(`${BASE_URL}/users/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify ({
                searchQuery: query
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error searching users in the front end", error)
        throw error
    }
}

export const addFriend = async({token, user2}) => {
    try {
        console.log(token)
        const response = await fetch(`${BASE_URL}/friends/sendRequest`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user2: user2
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error adding friend", error)
        throw error
    }
}

export const getUserFriendRequests = async(token) => {
    try {
        const response = await fetch(`${BASE_URL}/friends/requests`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error getting users friend request by id", error)
        throw error
    }
}

export const getFriends = async(token) => {
    try {
        const response = await fetch(`${BASE_URL}/friends/retrieve`, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching friends", error)
        throw error
    }
}

export const getPendingRequest = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/friends/pending`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error getting pending request", error)
        throw error
    }
}

export const deleteRequest = async(id) => {
    try {
        const response = await fetch(`${BASE_URL}/friends/delete/${id}`,{
            method: "DELETE"
        })
        .then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error deleting request", error)
        throw error
    }
}
