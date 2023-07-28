import React, { useState, useEffect, useRef } from 'react'
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom'
import {Login, NavBar, Chat, Account, Settings, Friend, Random} from './components/index'
import { All, Pending, FriendRequest, SearchFriends, } from './components/FriendsComponents'
import {getMe} from './api/users'
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
    const [addFriendSocket, setAddFriendSocket] = useState(false)
    const navigate = useNavigate()
    const loc = useLocation()


    const checkMe = async() => {
        const response = await getMe(token)
        console.log(response)
        if (response.error) {
            console.log("I triggered")
            navigate('/login')
            setIncreaseFrSocket(false)
            setPendingSocket(false)
            setAddFriendSocket(false)
            window.localStorage.removeItem('token')
        }else {
            navigate('/app')
            setSocket(
                io.connect('http://localhost:3000', {
                auth: {
                token: token
                }
            })
         )}   
    }
    useEffect(() => {
        if(token){
            checkMe()
        }else {
            navigate('/login')
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

            <Route path='settings' element={<Account token={token} setToken={setToken} socket={socket}/>}/>
        
        {!socket ? null : 
        <Route path='/app' element={<NavBar socket={socket} token={token} sentMessage={sentMessage} notifClass={notifClass} setToken={setToken}/>}>
            <Route path='chat' element={<Chat socket={socket} token={token}/>}/>
                <Route path="friend" element={<Friend socket={socket} />}>
                    <Route path='all' element={<All addFriendSocket={addFriendSocket} setAddFriendSocket={setAddFriendSocket} socket={socket} token={token} />}/>
                    <Route path='pending' element={<Pending pendingSocket={pendingSocket} setPendingSocket={setPendingSocket} socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                    <Route path='request' element={<FriendRequest increaseFrSocket={increaseFrSocket} setIncreaseFrSocket={setIncreaseFrSocket} socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                    <Route path='search' element={<SearchFriends socket={socket} setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotifClass={setNotifClass} token={token}/>}/>
                </Route>
        </Route>
            }
        </Routes>
        </>
    )
}

export default App