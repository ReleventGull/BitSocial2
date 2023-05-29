import { useState, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login, NavBar, Home, Chat, Profile, Settings, Search} from './components/index'

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
                <Route path="search" element={<Search />}/>
                <Route path='profile' element={<Profile />}/>
                <Route path='settings' element={<Settings />}/>
            </Route>
        </Routes>
    )
}

export default App