
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

