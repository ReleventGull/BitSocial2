import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import {searchUsers} from '../../api/users'
import { addFriend } from "../../api/users"

const Search = ({token, setNotfifClass, setSentMessage, notifClass, setCounter}) => {
    const {searchValue, setSearchValue} = useOutletContext()
    const [result, setResults] = useState('')
    const {index, setIndex, hoverStyle, setMessage} = useOutletContext()
    
    const searchForUsers = async() => {
        const response = await searchUsers({query: searchValue, token: token})
        setResults(response)
    }   
    
    const addFriendRequest = async(user2) => {
        const response = await addFriend({token:token, user2: user2})
        if(notifClass) {
            setCounter(0)
        }
        setNotfifClass('active')
        setSentMessage(response.message)
        console.log(response)
    }

    useEffect(() => {
        setMessage('')
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