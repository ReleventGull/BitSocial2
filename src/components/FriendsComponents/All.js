import { useState, useEffect } from 'react'
import {getFriends} from '../../api/users'
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
                            <img  className="userBodyIconImage check" src='/images/Chat.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default All