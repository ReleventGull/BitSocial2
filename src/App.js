import React, { useState, useEffect, useRef } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login, NavBar, Home, Chat, Profile, Settings, Friend} from './components/index'
import { All, Pending, FriendRequest, SearchFriends, } from './components/FriendsComponents'
import {io} from 'socket.io-client'

const App = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token') || '')
    const [sentMessage, setSentMessage] = useState('')
    const [notifClass, setNotifClass] = useState('')
    const [counter, setCounter] = useState(0)
    const [socket, setSocket] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if(token){
                 setSocket(
                    io.connect('http://localhost:3000', {
                    auth: {
                    token: token
                    }
                })
            ) 
        }
    }, [])


    let intervalId = useRef(null)

    useEffect(() => {
        if(notifClass) {
            intervalId.current = setInterval(() => {
                setCounter(pre => pre + 1)
            }, 500)
        }
    }, [notifClass])

    useEffect(() => {
        if(counter >= 6) {
            setNotifClass('')
            setTimeout(() => {
                setSentMessage('')
            }, 500)
            setCounter(0)
            clearInterval(intervalId.current)
        }
    }, [counter])


    return (
        <>
        {!socket ? null :
        <Routes>
        <Route path='login' element={<Login token={token} setToken={setToken}/>}/>
        <Route path='/' element={<NavBar socket={socket} token={token} sentMessage={sentMessage} notifClass={notifClass} setToken={setToken}/>}>
            <Route path='home' element={<Home socket={socket}/>}/>
            <Route path='chat' element={<Chat socket={socket} token={token}/>}/>
                <Route path="friend" element={<Friend socket={socket} />}>
                    <Route path='all' element={<All socket={socket} token={token} />}/>
                    <Route path='pending' element={<Pending socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                    <Route path='request' element={<FriendRequest socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                    <Route path='search' element={<SearchFriends socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                </Route>
            <Route path='profile' element={<Profile socket={socket}/>}/>
            <Route path='settings' element={<Settings socket={socket} setToken={setToken}/>}/>
        </Route>
    </Routes>
        
        
        
        
        }
        
        </>
    )
}

export default App