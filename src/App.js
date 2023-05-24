import { useState, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login} from './components/index'

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
            <Route path='login' element={<Login />}/>

        </Routes>
    )
}

export default App