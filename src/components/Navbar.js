import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { friendRequestCount, getRequestById } from "../api/users"
import {getUserChats, getChatById} from '../api/chat'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { increaseCount, setCount, decreaseCount } from "../redux/Unread"
import { setChats, addChat, removeChat } from "../redux/ChatAction"
import {addMessage} from '../redux/MessageAction'
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
    socket.on('create_chat', async({chatId}) => {
        const chat = await getChatById({token: token, chatId: chatId})
        dispatch(addChat(chat))
    })
    socket.on('remove_chat', ({chatId}) => {
        dispatch(removeChat(chatId))
    })
    socket.on('receive_message', (args) => {
        console.log(args)
        if(args.path == `/app/chat/${args.message.chat_id}`){
            console.log("Did I trigger")
            dispatch(addMessage(args.message))
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
                            <div style={{gap: (arr.length > 0 ? '.1rem' : '.6rem')}}className="chatNav">
                                {arr.length > 0 ? arr.map(i => 
                                        <ChatItem username={i.username} id={i.id}/>
                                    )
                                    :
                                    new Array(10).fill(10).map((a, i) => 
                                        <div style={{opacity: `${1 - (i / 10)}`}} className="noChatItem">
                                                <div className="noChatCircle"/>
                                                <div className="noChatBar"/>
                                        </div>
                                    )
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