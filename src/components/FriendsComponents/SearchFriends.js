import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import {searchUsers} from '../../api/users'
import { addFriend } from "../../api/users"

const Search = ({token, setNotfifClass, setSentMessage, notifClass, setCounter}) => {
    const [searchValue, setSearchValue] = useOutletContext()
    const [result, setResults] = useState('')
    
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
        setSentMessage(`${response.message} ${Math.random()} `)
        console.log(response)
    }
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
                result.map(user => 
                    <div className="searchUserBody">
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                                <img className="userBodyIconImage" src='/images/Chat.png'/>
                                <img onClick={() => addFriendRequest(user.id)} className="userBodyPlusImage" src='/images/Plus.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default Search