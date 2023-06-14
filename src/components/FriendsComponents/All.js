import { useState, useEffect } from 'react'
import {getFriends} from '../../api/users'

const All = ({token}) => {
    const [friends, setFriends] = useState(null)

    const fetchFriends = async () => {
        const response = await getFriends(token)
        setFriends(response)
    }
    useEffect(() => {
        fetchFriends()
    }, [])
    return (
        <div className="searchBody">
            {
                !friends ? null : 
                friends.map(user => 
                    <div className="searchUserBody">
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                            <img  className="userBodyIconImage check" src='/images/Chat.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default All