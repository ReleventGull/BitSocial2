import { useState } from 'react'
import {createChat} from '../../api/chat'


const FriendItem = ({user, i, setIndex, index, hoverStyle, removeFriend, token}) => {
    const [viewMenu, setViewMenu] = useState(false)

    const initiateChat = async() => {
        const response = await createChat({token: token, user1: user.user_1_id, user2: user.user_2_id})
        console.log(response)

    }

    return (
        <div key={i} style={i == index ? hoverStyle : null} onMouseLeave={() => {setIndex(null), setViewMenu(false)}}  onMouseOver={() => setIndex(i + 1)} className="searchUserBody">
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                            <img onClick={initiateChat}className="userBodyIconImage" src='/images/Chat.png'/>
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