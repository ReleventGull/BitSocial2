import { useState, useEffect } from 'react'
import {getFriends, deleteFriend, getFriendById, searchFriends} from '../../api/users'
import { useOutletContext, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setRequest, addRequest, removeRequest } from '../../redux/FriendActions'
import { removeChat } from '../../redux/ChatAction'
import FriendItem from './FriendItem'
const All = ({token, socket, addFriendSocket, setAddFriendSocket}) => {
    const {index, setIndex, hoverStyle, setMessage, searchValue} = useOutletContext()
    const {arr, count} = useSelector((state) => state.friendCount)
    const dispatch = useDispatch()
    const loc = useLocation()
    useEffect(() => {
        if(!addFriendSocket) {
            socket.on('add_friend', async(args) => {
                if(args.path === '/app/friend/all') {
                    const friendObj = await getFriendById(args.friendId, token)
                    dispatch(addRequest(friendObj))
                }
            })
            socket.on('remove_friend', async(args) => {
                if(args.path === '/app/friend/all') {
                    console.log(args)
                    dispatch(removeRequest(args.removedId))
                }
            })
            setAddFriendSocket(true)
        } 
    }, [])

    
    const fetchFriends = async () => {
        const response = await getFriends(token)
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
            searchForFriends()
        }
    }, [searchValue])
    
    const removeFriend = async (id, chatId) => {
        const response = await deleteFriend({id: id, token:token})
        dispatch(removeRequest(response.id))
        if(response.chatId) {
            dispatch(removeChat(response.chatId))
        }
        socket.emit('delete_friend', {
            userId: response.userId,
            friendId: response.id,
            chatId: response.chatId
        })
    }

    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
            })
        fetchFriends()
    }, [])

    return (
        <div style={
        {display: (arr.length < 1 ? 'grid' : 'block'),
        placeItems: (arr.length < 1 ? 'center' : '')
        }} className="searchBody">
            { arr.length > 0 ? <p className='countFriends'>Friends - {count}</p> : null}
            {
                arr.length < 1 ? 
                <div className='noFriendBox'>
                    <img src='/images/Patrick.png'/> 
                    <p>You have no friends!</p>
                </div>
                    
                    : 
                arr.map((user, i) => 
                    <FriendItem token={token} removeFriend={removeFriend} key={i} user={user} i={i} setIndex={setIndex} index={index} hoverStyle={hoverStyle}/>
                )
            }
        </div>
    )
}

export default All