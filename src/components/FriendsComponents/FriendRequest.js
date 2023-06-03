import { useEffect } from 'react'
import {getUserFriendRequests} from '../../api/users'

const FriendRequest = ({token}) => {

    const fetchRequest = async() => {
        console.log("Im running")
        const response = await getUserFriendRequests(token)
        console.log(response)
    }
    useEffect(() => {
        fetchRequest()
    }, [])
    return (
        <div className="searchBody">
            Hi!erghergergerge
        </div>
    )
}

export default FriendRequest