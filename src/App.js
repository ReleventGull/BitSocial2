import { useState, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login, NavBar} from './components/index'

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
            
            <Route path='/' element={<NavBar />}>

            </Route>
        </Routes>
    )
}

export default App