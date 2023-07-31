import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { friendRequestCount, getRequestById } from "../api/users"
import {getUserChats} from '../api/chat'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { increaseCount, setCount, decreaseCount } from "../redux/Unread"
import { setChats } from "../redux/ChatAction"
import ChatItem from './ChatItem'

const NavBar = ({notifClass, sentMessage, token, socket}) => {
    const navigate = useNavigate()
    const loc = useLocation()
    const dispatch = useDispatch()
    const {count} = useSelector((state) => state.unreadCount)
    const {name} = useSelector((state) => state.user)
    const {arr}  = useSelector(state => state.chat)



useEffect(() => {
    socket.on('notifyFr' , async(args) => {
        if(args.path !== '/app/friend/request' && args.action == 'increase') {
            dispatch(increaseCount())
        }else if(args.action == 'decrease' && args.unread == true && args.path !== '/app/friend/request'){
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

    const getChats = async() => {
        const response = await getUserChats(token)
        console.log(response)
        dispatch(setChats(response))
    }
    
    useEffect(() => {
        frCount()
        getChats()
    }, [])

    return(
    <>
        <div className="navBar">
            <div className="navBarBox">
                <Link to='friend' className={"imageBox" + ' navbar' + (loc.pathname == '/app/friend' || loc.pathname == '/app/friend/all' || loc.pathname == '/app/friend/pending' || loc.pathname == '/app/friend/request' || loc.pathname == '/app/friend/search' ? ' active' : '')}>
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
                <div className="navChatContainer">
                    <div className="chatHeader">
                        <h4>DIRECT MESSAGES</h4>
                            <div className="chatNav">
                                {arr.length > 0 ? arr.map(i => 
                                        <ChatItem username={i.username} id={i.id}/>
                                    )
                                    :
                                    null
                                }
                                
                            </div>
                    </div>
                </div>
            </div>
                <div className="navbarProfileBox">
                    <p>{name}</p>
                    <Link to='/settings' className="settingsNavbar">
                        <img className='settingsNavbarIcon' src='./images/Gear.png'/>
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