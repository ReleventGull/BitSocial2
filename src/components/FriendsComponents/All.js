import { useState, useEffect } from 'react'
import {getFriends} from '../../api/users'

const All = ({token}) => {
    const [friends, setFriends] = useState('')

    const fetchFriends = async () => {
        const response = await getFriends(token)
        console.log('Friends here', response)
    }
    useEffect(() => {
        fetchFriends()
    }, [])
    return (
        <div className="searchBody">
            Hi!erghergergerge
        </div>
    )
}

export default All