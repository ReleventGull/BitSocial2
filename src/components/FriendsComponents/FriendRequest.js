import { useEffect } from 'react'
import { useOutletContext, useLocation } from "react-router-dom"
import {getUserFriendRequests, deleteRequest, addFriend, retrieveSingleRequest} from '../../api/users'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'

const FriendRequest = ({token, increaseFrSocket, setNotifClass, setSentMessage, notifClass, setCounter, socket, setIncreaseFrSocket}) => {
    const { arr, count} = useSelector((state) => state.friendCount)
    const {index, setIndex, hoverStyle, setUnread, }  = useOutletContext()
    const loc = useLocation()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!increaseFrSocket) {
            setIncreaseFrSocket(true)
            socket.on('decreaseFr', (args) => {
                if(args.path == '/friend/request') {
                dispatch(removeRequest(args.requestId))
                }
            })
            socket.on('increaseFr', async(args) => {
                if(args.path == '/friend/request') {
                    const friendRequest = await retrieveSingleRequest(token, args.userId)
                    dispatch(addRequest(friendRequest))
                }
            })
        }
    }, [])

    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
            })
    }, [])
    
    const fetchRequest = async() => {
        const response = await getUserFriendRequests(token)
        dispatch(setRequest(response))
        
    }

    const addFriendRequest = async(user2, requestId) => {
        const response = await addFriend({token:token, user2: user2})
        console.log(response)
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
    }
    

    const deleteFriendFr = async(userId, id) => {
        const response = await deleteRequest(id)
        if (setNotifClass) {
            setCounter(0)
        }
        setNotifClass('active')
        setSentMessage(response.message)
        dispatch(removeRequest(id))
        setUnread((pre) => pre -= 1)
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