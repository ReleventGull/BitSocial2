import { useState, useEffect } from 'react'
import {getFriends, deleteFriend, getFriendById} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'
import FriendItem from './FriendItem'
const All = ({token, socket, addFriendSocket, setAddFriendSocket}) => {
    const {index, setIndex, hoverStyle, setMessage} = useOutletContext()
    const {arr, count} = useSelector((state) => state.friendCount)
    const dispatch = useDispatch()
    const loc = useLocation()
    
    useEffect(() => {
        if(!addFriendSocket) {
            socket.on('add_friend', async(args) => {
                console.log("I made it")
                if(args.path === '/friend/all') {
                    console.log("I made it")
                    const friendObj = await getFriendById(args.friendId, token)
                    console.log(friendObj)
                    dispatch(addRequest(friendObj))
                }
            })
            setAddFriendSocket(true)
        } 
    }, [])
    
    
    const fetchFriends = async () => {
        const response = await getFriends(token)
        const obj = {
            requests: response.friends,
            count: response.count
        }
        dispatch(setRequest(obj))
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
                    <FriendItem key={i} user={user} i={i} setIndex={setIndex} index={index} hoverStyle={hoverStyle}/>
                )
            }
        </div>
    )
}

export default All