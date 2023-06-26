import { useEffect } from "react"
import {useLocation} from 'react-router-dom'

const Profile = ({socket}) => {
    const loc = useLocation()

    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
        })
    }, [])
    return (
        <div className="outlet Profile">

        </div>
    )
}
export default Profile