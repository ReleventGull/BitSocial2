import { useEffect, useState } from 'react'
import {getPendingRequest, deleteRequest, searchPending} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'


const Pending = ({token, setCounter, setSentMessage, setNotifClass, notifClass, socket, pendingSocket, setPendingSocket}) => {
    const [pending, setPending] = useState('')
    const {arr, count} = useSelector(state => state.friendCount)
    const {index, setIndex, hoverStyle, searchValue} = useOutletContext()
    const dispatch = useDispatch()
    const loc = useLocation()
    const getPending = async() => {
            const response = await getPendingRequest(token)
            dispatch(setRequest({requests: response.response, count: response.count}))
    }
    const getSearchPending = async() => {
        const response = await searchPending({token: token, searchQuery: searchValue})
        dispatch(setRequest({requests: response, count: response.length}))
    }

    useEffect(() => {
        if (!pendingSocket) {
            setPendingSocket(true)
            socket.on('delete_pending', ({requestId, path}) => {
                if(path == '/friend/pending') {
                    dispatch(removeRequest(requestId))
                }
            })
        }
    }, [])
    
    useEffect(() => {
        if (!searchValue) {
            getPending()
        }else {
            getSearchPending()
        }
    }, [searchValue])
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
        socket.emit("delete_pending_request", {recieving: userId, requestId: response.requestId, unread: response.unread})
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