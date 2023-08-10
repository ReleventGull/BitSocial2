import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getChatById } from '../../api/chat'
import { addChat } from '../../redux/ChatAction'
import { useDispatch } from 'react-redux'

const FriendItem = ({user, i, setIndex, index, hoverStyle, removeFriend, token}) => {
    const [viewMenu, setViewMenu] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const selectChat = async() => {
        const chat = await getChatById({token: token,  chatId: user.chatId})
        if(chat.code) { 
            navigate(`/app/chat/${user.chatId}`)
        }else {
            dispatch(addChat(chat))
            navigate(`/app/chat/${user.chatId}`)
        }
    }


    return (
        <div key={i} style={i == index ? hoverStyle : null} onMouseLeave={() => {setIndex(null), setViewMenu(false)}}  onMouseOver={() => setIndex(i + 1)} className="searchUserBody">
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                            <img onClick={selectChat} className="userBodyIconImage" src='/images/Chat.png'/>
                                <div className='friendMenuBox'>
                                    <img onClick={() => setViewMenu((pre) => !pre)} className="userBodyIconImage menu" src='/images/Menu.png'/>
                                    { !viewMenu ? null : 
                                        <ul className='dropDownFriendMenu'>
                                            <li onClick={() => {removeFriend(user.id), setViewMenu(false)}}className='removeFriendButton'>Remove Friend</li>
                                        </ul>
                                    }
                                        
                                </div>
                            </div>
                    </div>
    )
}

export default FriendItem