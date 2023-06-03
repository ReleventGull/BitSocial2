import { useEffect, useState } from 'react'
import {getUserFriendRequests} from '../../api/users'

const FriendRequest = ({token}) => {
    const [request, setRequest] = useState('')
    const fetchRequest = async() => {
        const response = await getUserFriendRequests(token)
        if(!response.message) {
            console.log(response)
            setRequest(response)
        }
       
    }
    useEffect(() => {
        fetchRequest()
    }, [])
    return (
        <div className="searchBody">
             {
                !request ? null : 
                request.map(user => 
                    <div className="searchUserBody">
                        <h2>{user.usersent}</h2>
                            <div className="userBodyIconBox">
                            <img className="userBodyIconImage check" src='/images/Check.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default FriendRequest