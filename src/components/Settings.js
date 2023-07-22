import { useEffect } from "react"
import {useLocation} from 'react-router-dom'

const Settings = ({setToken, socket, setIncreaseFrSocket}) => {
    
    const loc = useLocation()
    
    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
        })
    }, [])
    return (
        <div className="outlet Settings">
               
        </div>
    )
}
export default Settings