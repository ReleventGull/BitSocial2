import { useState, useEffect } from 'react'
import {getFriends} from '../../api/users'
import { useOutletContext } from 'react-router-dom'

const All = ({token}) => {
    const [friends, setFriends] = useState(null)
    const {index, setIndex, hoverStyle} = useOutletContext()
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
                friends.map((user, i) => 
                    <div style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className="searchUserBody">
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