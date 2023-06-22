import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { friendRequestCount } from "../api/users"
import {useEffect, useState} from 'react'


const NavBar = ({notifClass, sentMessage, token}) => {
    const [unread, setUnread] = useState('')
    const navigate = useNavigate()
    const loc = useLocation()

    useEffect(() => {
        if (loc.pathname == '/') {
            navigate('home')
        }
    }, [])

    const frCount = async() => {
        const response = await friendRequestCount(token)
        setUnread(response.count)
    }
    useEffect(() => {
        frCount()
    }, [])

    return(
    <>
        <div className="navBar">
            <div className="navBarBox">
                <Link to='home' className={"imageBox" + (loc.pathname == '/home' ? ' active' : '')} >
                        <img src='/images/home.png'/>
                        <h3>Home</h3>
                </Link>
                <Link to='profile' className={"imageBox" + (loc.pathname == '/profile' ? ' active' : '')}>
                        <img src='/images/Profile.png'/>
                        <h3>Profile</h3>
                </Link>
                <Link to='friend' className={"imageBox" + (loc.pathname == '/friend' || loc.pathname == '/friend/all' || loc.pathname == '/friend/pending' || loc.pathname == '/friend/request' || loc.pathname == '/friend/search' ? ' active' : '')}>
                        <div className="frBubble">
                            {unread}
                        </div>
                        <img src='/images/Friend.png'/>
                        <h3>Friends</h3>
                </Link>
                <Link to='settings' className={"imageBox" + (loc.pathname == '/settings' ? ' active' : '')}>
                        <img src='/images/Gear.png'/>
                        <h3>Settings</h3>
                </Link>
            </div>
        </div>
       
       <div className="outDiv">
        <Outlet context={{unread}}/>
        <div className={"notifPortal " + notifClass}>
           {sentMessage}
        </div>
       </div>
    </>
    )
}

export default NavBar