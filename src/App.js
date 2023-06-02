import { useState, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login, NavBar, Home, Chat, Profile, Settings, Friend} from './components/index'
import { All, Pending, FriendRequest, SearchFriends } from './components/FriendsComponents'

const App = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token') || '')
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token){
            console.log("I got here")
            navigate('login') 
        } 
    }, [token])
    
    return (
        <Routes>
            <Route path='login' element={<Login token={token} setToken={setToken}/>}/>
            <Route path='/' element={<NavBar setToken={setToken}/>}>
                <Route path='home' element={<Home />}/>
                <Route path='chat' element={<Chat token={token}/>}/>
                    <Route path="friend" element={<Friend />}>
                        <Route path='all' element={<All />}/>
                        <Route path='pending' element={<Pending />}/>
                        <Route path='friendrequest' element={<FriendRequest />}/>
                        <Route path='search' element={<SearchFriends token={token}/>}/>
                    </Route>
                <Route path='profile' element={<Profile />}/>
                <Route path='settings' element={<Settings setToken={setToken}/>}/>
            </Route>
        </Routes>
    )
}

export default App