import { useEffect, useState } from "react"
import { useOutletContext, useLocation } from "react-router-dom"
import {searchUsers} from '../../api/users'
import { addFriend } from "../../api/users"


const Search = ({token, setNotifClass, setSentMessage, notifClass, setCounter, socket}) => {
    const {searchValue, setSearchValue} = useOutletContext()
    const [result, setResults] = useState('')
    const {index, setIndex, hoverStyle} = useOutletContext()
    const loc = useLocation()
    
    const searchForUsers = async() => {
        const response = await searchUsers({query: searchValue, token: token})
        setResults(response)
    }   
    
    const addFriendRequest = async(user2) => {
        const response = await addFriend({token:token, user2: user2})
        if(notifClass) {
            setCounter(0)
        }
        setNotifClass('active')
        setSentMessage(response.message)
        if(!response.error) {
            socket.emit('friend_request', {recieving: user2})
        }
    }

    useEffect(() => {
        socket.emit('pathname', {
        path: loc.pathname
        })
    }, [])

    useEffect(() => {
        if(searchValue) {
            searchForUsers()
        }else {
            setResults('')
        }
    }, [searchValue])
    
    return (
        <div className="searchBody">
            {
                !result ? null : 
                result.map((user, i) => 
                    <div style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className="searchUserBody">
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                                <img onClick={() => addFriendRequest(user.id)} className="userBodyPlusImage" src='/images/Plus.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default Search