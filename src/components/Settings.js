import { useEffect } from "react"
import {useLocation} from 'react-router-dom'

const Settings = ({setToken, socket}) => {
    
    const loc = useLocation()
    
    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
        })
    }, [])
    return (
        <div className="outlet Settings">
                <div onClick={() => {window.localStorage.removeItem('token'), setToken('')}} className="imageBox">
                        <img src='/images/Logout.png'/>
                        <h3>Logout</h3>
                    
                </div>
        </div>
    )
}
export default Settings