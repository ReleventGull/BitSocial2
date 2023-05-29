import { useState } from "react"



const Chat = ({token}) => {
    const [searchedUsers, setSearchedUsers] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [active, setActive] = useState('search')
    const [currentChat, setCurrentChat] = useState('')
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
            <div className="chatInterface">
                <div className="interface one">
                </div>
                <div className="interface two">
                </div>
                <div className="interface three">
                    <input disabled={true} placeholder="Message..." className="sendMessageInput"></input>
                    <img src='/images/Send2.png' className={`sendMessageButton `+ (currentChat ? 'active' : '')}/>
                </div>
            </div>
        </div>
    )
}
export default Chat