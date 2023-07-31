import { useState, useEffect } from 'react'
import {getFriends, deleteFriend, getFriendById, searchFriends} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'
import { createChat } from '../../api/chat'
import FriendItem from './FriendItem'
const All = ({token, socket, addFriendSocket, setAddFriendSocket}) => {
    const {index, setIndex, hoverStyle, setMessage, searchValue} = useOutletContext()
    const {arr, count} = useSelector((state) => state.friendCount)
    const dispatch = useDispatch()
    const loc = useLocation()
    useEffect(() => {
        if(!addFriendSocket) {
            socket.on('add_friend', async(args) => {
                console.log("I was instated", args)
                if(args.path === '/app/friend/all') {
                    const friendObj = await getFriendById(args.friendId, token)
                    console.log(friendObj)
                    dispatch(addRequest(friendObj))
                }
            })
            socket.on('remove_friend', async(args) => {
                console.log("I got hit with remove friend", args)
                if(args.path === '/app/friend/all') {
                    dispatch(removeRequest(args.removedId))
                }
            })
            setAddFriendSocket(true)
        } 
    }, [])

    
    const fetchFriends = async () => {
        const response = await getFriends(token)
        console.log(response)
        const obj = {
            requests: response.friends,
            count: Number(response.count)
        }
        dispatch(setRequest(obj))
    }

    const searchForFriends = async() => {
        const response = await searchFriends({searchQuery:searchValue, token: token })
        const obj = {
            requests: response,
            count: response.length
        }
        dispatch(setRequest(obj))
    }
    useEffect(() => {
        if (!searchValue) {
            fetchFriends()
        }else {
            console.log("Result goes here")
            searchForFriends()
        }
    }, [searchValue])
    const removeFriend = async (id) => {
        console.log("I am the remove friend function")
        const response = await deleteFriend({id: id, token:token})
        dispatch(removeRequest(response.id))
        console.log("Remvoe after dispatch")
        socket.emit('delete_friend', {
            userId: response.userId,
            friendId: response.id
        })
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
                    <FriendItem token={token} removeFriend={removeFriend} key={i} user={user} i={i} setIndex={setIndex} index={index} hoverStyle={hoverStyle}/>
                )
            }
        </div>
    )
}

export default All