import { useEffect, useState } from 'react'
import {getUserFriendRequests} from '../../api/users'
import { addFriend } from "../../api/users"

const FriendRequest = ({token, setNotfifClass, setSentMessage, notifClass, setCounter}) => {
    const [request, setRequest] = useState('')
    console.log(request)
    const fetchRequest = async() => {
        const response = await getUserFriendRequests(token)
        if(!response.message) {
            console.log(response)
            setRequest(response)
        }
    }

    const addFriendRequest = async(user2) => {
        console.log(user2)
        const response = await addFriend({token:token, user2: user2})
        if(notifClass) {
            setCounter(0)
        }
        setNotfifClass('active')
        setSentMessage(`${response.message} ${Math.random()} `)
        if(!response.error) {
            for(let i = 0; i < request.length; i++) {
                if (request[i].user_sent_id == user2) {
                    request.splice(i ,1)
                }
            }
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
                            <img onClick={() => addFriendRequest(user.user_sent_id)} className="userBodyIconImage check" src='/images/Check.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default FriendRequest