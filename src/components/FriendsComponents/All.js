import { useState, useEffect } from 'react'
import {getFriends, deleteFriend} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'
const All = ({token, socket}) => {
    const {index, setIndex, hoverStyle, setMessage} = useOutletContext()
    const {arr, count} = useSelector((state) => state.friendCount)
    const dispatch = useDispatch()
    const loc = useLocation()
    
    const fetchFriends = async () => {
        console.log("Am I fucking running")
        const response = await getFriends(token)
        const obj = {
            requests: response.friends,
            count: response.count
        }
        dispatch(setRequest(obj))
        console.log(arr)
    }
    
    const removeFriend = async (id) => {
        const response = await deleteFriend({id: id, token:token})
        console.log(response)
    }

    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
            })
        fetchFriends()
    }, [])

    return (
        <div className="searchBody">
            <p className='countFriends'>Friends - {count}</p>
            {
                arr.length < 1 ? null : 
                arr.map((user, i) => 
                    <div key={i} style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className="searchUserBody">
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                            <img onClick={() => removeFriend(user.id)} className="userBodyIconImage" src='/images/Chat.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default All