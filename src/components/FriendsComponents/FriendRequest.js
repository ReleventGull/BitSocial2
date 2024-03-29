import { useEffect } from 'react'
import { useOutletContext, useLocation, useNavigate } from "react-router-dom"
import {getUserFriendRequests, deleteRequest, addFriend, retrieveSingleRequest, searchRequest} from '../../api/users'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'
import {addChat} from '../../redux/ChatAction'
import { deleteCount } from '../../redux/Unread'
import { getChatById } from '../../api/chat'
const FriendRequest = ({token, increaseFrSocket, setNotifClass, setSentMessage, notifClass, setCounter, socket, setIncreaseFrSocket}) => {
    const { arr, count} = useSelector((state) => state.friendCount)
    const {count: bubbleCount} = useSelector(state => state.unreadCount)
    const {index, setIndex, hoverStyle, searchValue}  = useOutletContext()
    const loc = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!increaseFrSocket) {
            socket.on('increaseFr', async(args) => {
                if(args.path == '/app/friend/request') {
                    const friendRequest = await retrieveSingleRequest(token, args.userId)
                    dispatch(addRequest(friendRequest))
                }
            })
            socket.on('decreaseFr', (args) => {
                if(args.path == '/app/friend/request') {
                dispatch(removeRequest(args.requestId))
                }
            })
            setIncreaseFrSocket(true)
        }
    }, [])

    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
            })
        dispatch(deleteCount())
    }, [])
    
    const fetchRequest = async() => {
        const response = await getUserFriendRequests(token)
        dispatch(setRequest(response))
        
    }
    const searchForRequests = async() => {
        const response = await searchRequest({searchQuery:searchValue, token: token})
        const obj = {
            requests: response,
            count: response.length
        }
        dispatch(setRequest(obj))
}

useEffect(() => {
    if (!searchValue) {
        fetchRequest()
    }else {
        searchForRequests()
    }
}, [searchValue])

    const addFriendRequest = async(user2, requestId) => {
        const response = await addFriend({token:token, user2: user2})
        if(notifClass) {
            setCounter(0)
        }
        setNotifClass('active')
        setSentMessage(`${response.message}`)
        if(!response.error) {
        dispatch(removeRequest(requestId))
        }
        socket.emit('delete_friend_request', {
            message: "Deleting friend request",
            userId: user2,
            requestId: requestId
        })
        socket.emit('accept_friend', {
            message: "Request accepted",
            userId: user2,
            friendId: response.friend.id,
            chatId: response.chat.id
        })
        const chat = await getChatById({token: token, chatId: response.chat.id})
        dispatch(addChat(chat))
        navigate(`/app/chat/${response.chat.id}`)
    }
    

    const deleteFriendFr = async(userId, id) => {
        const response = await deleteRequest(id)
        if (setNotifClass) {
            setCounter(0)
        }
        setNotifClass('active')
        setSentMessage(response.message)
        dispatch(removeRequest(id))
        socket.emit('delete_friend_request', {
            message: "Deleting friend request",
            userId: userId,
            requestId: id
        })
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    return (
        <div className="searchBody"> <p className='countFriends'>Request - {count}</p>{
                arr.length < 1 ? null : 
                arr.map((user, i) => 
                    <div key={i} style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className="searchUserBody">
                        <h2>{user.usersent}</h2>
                            <div className="userBodyIconBox">
                            <img onClick={() => addFriendRequest(user.user_sent_id, user.id)} className="userBodyIconImage check" src='/images/Check.png'/>
                            <img onClick={() => deleteFriendFr(user.user_sent_id, user.id)} className="userBodyIconImage check" src='/images/Clear.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default FriendRequest