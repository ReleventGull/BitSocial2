import { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom"
import {getUserFriendRequests, deleteRequest, addFriend} from '../../api/users'

const FriendRequest = ({token, setNotifClass, setSentMessage, notifClass, setCounter, socket}) => {
    const [request, setRequest] = useState('')
    const {index, setIndex, hoverStyle, setMessage} = useOutletContext()
    
    
    const fetchRequest = async() => {
        const response = await getUserFriendRequests(token)
        setRequest(response.requests)
        setMessage(response.count)
    }

    const addFriendRequest = async(user2) => {
        const response = await addFriend({token:token, user2: user2})
        if(notifClass) {
            setCounter(0)
        }
        setNotifClass('active')
        setSentMessage(`${response.message}`)
        if(!response.error) {
            for(let i = 0; i < request.length; i++) {
                if (request[i].user_sent_id == user2) {
                    request.splice(i ,1)
                    setMessage((pre) => pre -= 1)
                }
            }
        }
    }
    
    const deleteFriendFr = async(id) => {
        const response = await deleteRequest(id)
        if (setNotifClass) {
            setCounter(0)
        }
        setNotifClass('active')
        setSentMessage(response.message)
        for(let i = 0; i < request.length; i++) {
            if (request[i].id == id) {
                request.splice(i, 1)
                setMessage((pre) => pre -= 1)
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
                request.map((user, i) => 
                    <div style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className="searchUserBody">
                        <h2>{user.usersent}</h2>
                            <div className="userBodyIconBox">
                            <img onClick={() => addFriendRequest(user.user_sent_id)} className="userBodyIconImage check" src='/images/Check.png'/>
                            <img onClick={() => deleteFriendFr(user.id)} className="userBodyIconImage check" src='/images/Clear.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default FriendRequest