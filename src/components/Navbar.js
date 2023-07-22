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
                <Link to='home' className={"imageBox" + ' navbar' + (loc.pathname == '/home' ? ' active' : '')} >
                        <img src='/images/home.png'/>
                        <h3>Home</h3>
                </Link>
                <Link to='friend' className={"imageBox" + ' navbar' + (loc.pathname == '/friend' || loc.pathname == '/friend/all' || loc.pathname == '/friend/pending' || loc.pathname == '/friend/request' || loc.pathname == '/friend/search' ? ' active' : '')}>
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
                <Link to='account' className={"imageBox" + ' navbar' + (loc.pathname == '/account' ? ' active' : '')}>
                        <img src='/images/Profile.png'/>
                        <h3>Account</h3>
                </Link>
                <Link to='settings' className={"imageBox" + ' navbar' + (loc.pathname == '/settings' ? ' active' : '')}>
                        <img src='/images/Gear.png'/>
                        <h3>Settings</h3>
                </Link>
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