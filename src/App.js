import React, { useState, useEffect, useRef } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login, NavBar, Home, Chat, Profile, Settings, Friend, Notif} from './components/index'
import { All, Pending, FriendRequest, SearchFriends, } from './components/FriendsComponents'

const App = ({socket}) => {
    const [token, setToken] = useState(window.localStorage.getItem('token') || '')
    const [counter, setCounter ] = useState(0)
    const [sentMessage, setSentMessage] = useState(' ')
    const [notifClass, setNotfifClass] = useState('')
    const [shouldContinueInterval, setShouldContinueInterval] = useState(true);
    const navigate = useNavigate()
    
    let intervalId = useRef(null)
    


    const notifInterval = () => {
         intervalId.current = setInterval(() => {
            setCounter(pre => pre + 1)
        }, 1000)
    }
    
    
    
    
useEffect(() => {
    if(counter >= 5) {
        console.log("I'm running", counter)
        setCounter(0)
        setNotfifClass('')
        clearInterval(intervalId.current)
        intervalId.current = null
        setShouldContinueInterval(false);
    }
     if (notifClass) {
        console.log("I should be hit once", notifClass)
        notifInterval()
    }else {
            clearInterval(intervalId.current)
            intervalId.current = null
        
    }
    
}, [notifClass, counter])
    
useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  
useEffect(() => {
    if (!shouldContinueInterval) {
      clearInterval(intervalId.current);
    }
  }, [shouldContinueInterval]);
    
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
                        <Route path='all' element={<All />}/>
                        <Route path='pending' element={<Pending token={token}/>}/>
                        <Route path='request' element={<FriendRequest token={token}/>}/>
                        <Route path='search' element={<SearchFriends setSentMessage={setSentMessage} setNotfifClass={setNotfifClass} token={token}/>}/>
                    </Route>
                <Route path='profile' element={<Profile />}/>
                <Route path='settings' element={<Settings setToken={setToken}/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default App