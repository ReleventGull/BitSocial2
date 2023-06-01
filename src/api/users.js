
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

