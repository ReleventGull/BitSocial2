import { useState } from "react"
import {searchUsers} from '../api/users'
const activeStyle = {
    backgroundColor: 'var(--third)',
    borderRadius: '12px',
    color: 'var(--primary)',
    transition: '.2s'
}

const Chat = ({token}) => {
    const [searchedUsers, setSearchedUsers] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [active, setActive] = useState('search')
    
    const handleSearch = async() => {
        console.log(searchQuery)
        const response = await searchUsers({token: token, query: searchQuery})
        if(searchQuery.length > 0) {
            setSearchedUsers(response)
        }else {
            setSearchedUsers(null)
        }

    }


    return (
        <div className="outlet Chat">
            <div className="chatSelectionBox">
                <div className="topChatSelection">
                    <div onClick={() => setActive('current')} className="chatSelectionDiv" style={(active == 'current' ? activeStyle : null)}>
                        <h2 className="chatSelectionButtons">Current</h2>
                    </div>
                    <div  onClick={() => setActive('search')} className="chatSelectionDiv" style={(active == 'search' ? activeStyle : null)}>
                        <h2 className="chatSelectionButtons">Search</h2>
                    </div>
                </div>
                {active != 'search' ? null : 
                <div className="searchBox">
                    <input value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value), handleSearch()}} className="searchInput" placeholder="Search..."></input>
                   
                </div>
                }
                 <div className="searchResultContainer">
                        {
                            !searchedUsers || active !== 'search' ? null :
                            searchedUsers.map( user => 
                            <div className="userSearchBox">
                                    <h2>{user.username}</h2>

                                        <div className="searchOptions">
                                        <img src='/images/More.png'/>
                                        <img src='/images/Chat.png'/>
                                        </div>
                                    
                            </div>
                            )
                        }
                    </div>
            </div>
        </div>
    )
}
export default Chat