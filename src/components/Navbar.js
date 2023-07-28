import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { friendRequestCount, getRequestById } from "../api/users"
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { increaseCount, setCount, decreaseCount } from "../redux/Unread"
const NavBar = ({notifClass, sentMessage, token, socket}) => {
    const navigate = useNavigate()
    const loc = useLocation()
    const dispatch = useDispatch()
    const {count} = useSelector((state) => state.unreadCount)


useEffect(() => {
    socket.on('notifyFr' , async(args) => {
        if(args.path !== '/friend/request' && args.action == 'increase') {
            dispatch(increaseCount())
        }else if(args.action == 'decrease' && args.unread == true && args.path !== '/friend/request'){
            dispatch(decreaseCount())
        }
    })
}, [])

    useEffect(() => {
        if (loc.pathname == '/') {
            navigate('home')
        }
    }, [])

    const frCount = async() => {
        const response = await friendRequestCount(token)
        dispatch(setCount(response.count))

    }
    useEffect(() => {
        frCount()
    }, [])

    return(
    <>
        <div className="navBar">
            <div className="navBarBox">
                <Link to='friend' className={"imageBox" + ' navbar' + (loc.pathname == '/app/friend' || loc.pathname == '/friend/all' || loc.pathname == '/friend/pending' || loc.pathname == '/friend/request' || loc.pathname == '/friend/search' ? ' active' : '')}>
                        {count > 0 ? 
                            <div className="frBubble">
                            {count}
                            </div>
                            :
                            null
                    
                        }
                        
                        <img src='/images/Friend.png'/>
                        <h3>Friends</h3>
                </Link>
                <Link to='account' className={"imageBox" + ' navbar' + (loc.pathname == '/app/account' ? ' active' : '')}>
                        <img src='/images/Profile.png'/>
                        <h3>Account</h3>
                </Link>
            </div>
                <div className="navbarProfileBox">
                    <p>Jaron</p>
                    <div className="settingsNavbar">
                        <img className='settingsNavbarIcon' src='./images/Gear.png'/>
                    </div>
                    
                </div>
        </div>

       <div className="outDiv">
        <Outlet />
        <div className={"notifPortal " + notifClass}>
           {sentMessage}
        </div>
       </div>
    </>
    )
}

export default NavBar