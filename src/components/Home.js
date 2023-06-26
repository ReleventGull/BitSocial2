import { useEffect } from "react"
import {useLocation} from 'react-router-dom'
const Home = ({socket}) => {
    const loc = useLocation()
    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
        })
    })
    return (
        <div className="outlet Home">

        </div>
    )
}
export default Home