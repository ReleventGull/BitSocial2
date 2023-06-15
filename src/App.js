import React, { useState, useEffect, useRef } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login, NavBar, Home, Chat, Profile, Settings, Friend, Notif} from './components/index'
import { All, Pending, FriendRequest, SearchFriends, } from './components/FriendsComponents'

const App = ({socket}) => {
    const [token, setToken] = useState(window.localStorage.getItem('token') || '')
    const [sentMessage, setSentMessage] = useState('')
    const [notifClass, setNotfifClass] = useState('')
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()
    
    
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
            setNotfifClass('')
            setTimeout(() => {
                setSentMessage('')
            }, 500)
            setCounter(0)
            clearInterval(intervalId.current)
        }
    }, [counter])



    
    useEffect(() => {
        if(!token){
            console.log("I got here")
            navigate('login') 
        } 
    }, [token])
    
    return (
        <>
      
        <Routes>
            <Route path='login' element={<Login token={token} setToken={setToken}/>}/>
            <Route path='/' element={<NavBar sentMessage={sentMessage} notifClass={notifClass} setToken={setToken}/>}>
                <Route path='home' element={<Home />}/>
                <Route path='chat' element={<Chat token={token}/>}/>
                    <Route path="friend" element={<Friend />}>
                        <Route path='all' element={<All token={token} />}/>
                        <Route path='pending' element={<Pending setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotfifClass={setNotfifClass} token={token}/>}/>
                        <Route path='request' element={<FriendRequest setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotfifClass={setNotfifClass} token={token}/>}/>
                        <Route path='search' element={<SearchFriends setCounter={setCounter} notifClass={notifClass} setSentMessage={setSentMessage} setNotfifClass={setNotfifClass} token={token}/>}/>
                    </Route>
                <Route path='profile' element={<Profile />}/>
                <Route path='settings' element={<Settings setToken={setToken}/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default App