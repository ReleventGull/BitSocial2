import { useEffect, useState } from 'react'
import {getPendingRequest, deleteRequest} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'


const Pending = ({token, setCounter, setSentMessage, setNotifClass, notifClass, socket}) => {
    const [pending, setPending] = useState('')
    const {index, setIndex, hoverStyle, setMessage} = useOutletContext()
    const loc = useLocation()
    const getPending = async() => {
            const response = await getPendingRequest(token)
            setMessage(response.count)
            setPending(response.response)
    }

    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
            })
        getPending()  
    }, [])

    const deleteR = async(id, userId) => {
        for(let i = 0; i < pending.length; i++) {
            if (pending[i].id == id) {
                pending.splice(i, 1)
            }
        }
        const response = await deleteRequest(id)
        if(notifClass) {
            setCounter(0)
        }else {
            setNotifClass('active')
        }
        setSentMessage(response.message)
        setMessage((pre) => pre -= 1)

        socket.emit("delete_friend_request", {recieving: userId})
    }

    return (
        <div className="searchBody">

             {
                !pending ? null : 
                pending.map((user, i) => 
                    <div style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className={"searchUserBody " + i}>
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                            <img onClick={() => deleteR(user.id, user.user_recieved_id)}className="userBodyIconImage" src='/images/Clear.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default Pending