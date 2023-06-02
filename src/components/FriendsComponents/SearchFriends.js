import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import {searchUsers} from '../../api/users'
import { addFriend } from "../../api/users"

const Search = ({token}) => {
    const [searchValue, setSearchValue] = useOutletContext()
    const [result, setResults] = useState('')
    
    const searchForUsers = async() => {
        const response = await searchUsers({query: searchValue, token: token})
        setResults(response)
    }   
    
    const addFriendRequest = async(user2) => {
        const response = await addFriend({token:token, user2: user2})
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