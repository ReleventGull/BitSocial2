import { useState, useEffect } from 'react'
import {getFriends, deleteFriend} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'
import FriendItem from './FriendItem'
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
                    <FriendItem user={user} i={i} setIndex={setIndex} index={index} hoverStyle={hoverStyle}/>
                )
            }
        </div>
    )
}

export default All