import React, { useState, useEffect, useRef } from 'react'

import store from './redux/store'
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom'
import {Login, NavBar, Home, Chat, Profile, Settings, Friend} from './components/index'
import { All, Pending, FriendRequest, SearchFriends, } from './components/FriendsComponents'
import {io} from 'socket.io-client'

const App = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token') || '')
    const [sentMessage, setSentMessage] = useState('')
    const [notifClass, setNotifClass] = useState('')
    const [counter, setCounter] = useState(0)
    const [socket, setSocket] = useState('')

    //UseStates for establishing socket connections
    const [increaseFrSocket, setIncreaseFrSocket] = useState(false)
    const [pendingSocket, setPendingSocket] = useState(false)
    console.log('increaseSocket here', increaseFrSocket)
    const navigate = useNavigate()
    const loc = useLocation()


    useEffect(() => {
        if(!token) {
            navigate('/login')
            setIncreaseFrSocket(false)
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
    }, [token])


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
 
        <Routes>
        <Route path='login' element={<Login token={token} setToken={setToken}/>}/>
        {!socket ? null : 
        <Route path='/' element={<NavBar socket={socket} token={token} sentMessage={sentMessage} notifClass={notifClass} setToken={setToken}/>}>
            <Route path='home' element={<Home socket={socket}/>}/>
            <Route path='chat' element={<Chat socket={socket} token={token}/>}/>
                <Route path="friend" element={<Friend socket={socket} />}>
                    <Route path='all' element={<All socket={socket} token={token} />}/>
                    <Route path='pending' element={<Pending pendingSocket={pendingSocket} setPendingSocket={setPendingSocket} socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                    <Route path='request' element={<FriendRequest increaseFrSocket={increaseFrSocket} setIncreaseFrSocket={setIncreaseFrSocket} socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                    <Route path='search' element={<SearchFriends socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                </Route>
            <Route path='profile' element={<Profile socket={socket}/>}/>
            <Route path='settings' element={<Settings setIncreaseFrSocket={setIncreaseFrSocket}socket={socket} setToken={setToken}/>}/>
        </Route>
            }
        </Routes>

    
        
        
        </>
    )
}

export default App