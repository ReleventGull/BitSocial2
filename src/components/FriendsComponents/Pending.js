import { useEffect, useState } from 'react'
import {getPendingRequest, deleteRequest} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'

const Pending = ({token, setCounter, setSentMessage, setNotifClass, notifClass, socket}) => {
    const [pending, setPending] = useState('')
    const {arr, count} = useSelector(state => state.friendCount)
    const {index, setIndex, hoverStyle,} = useOutletContext()
    const dispatch = useDispatch()
    const loc = useLocation()

    const getPending = async() => {
            const response = await getPendingRequest(token)
            console.log(response)
            dispatch(setRequest({requests: response.response, count: response.count}))
    }

    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
            })
        getPending()  
    }, [])

    const deleteR = async(id, userId) => {
        dispatch(removeRequest(id))
        const response = await deleteRequest(id)
        if(notifClass) {
            setCounter(0)
        }else {
            setNotifClass('active')
        }
        setSentMessage(response.message)
        socket.emit("delete_friend_request", {recieving: userId})
    }

    return (
        <div className="searchBody">
            <p className='countFriends'>Pending - {count}</p>
             {
                !arr ? null : 
                arr.map((user, i) => 
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