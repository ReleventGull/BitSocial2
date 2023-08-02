import { useEffect, useState, } from "react"
import { useLocation, useParams } from "react-router-dom"
import {sendMessage, getMessages} from '../api/chat'

const Chat = ({token, socket}) => {
const [message, setMessage ] = useState('')
const loc = useLocation()
const params = useParams()


const fetchMessage = async() => {
    const response = await getMessages({token: token, chatId: params.id})
    console.log(response)
}

useEffect(() => {
    socket.emit('pathname', {
        path: loc.pathname
    })
    fetchMessage()
}, [])

const emitMessage = async(e) => {
    e.preventDefault()
    const respones = await sendMessage({token: token, message: message, chatId: params.id})
    console.log(respones)
}

    return (
        <div className="outlet Chat">
            <div className="chatInterface">
                <div className="interface one">
                </div>
                <div className="interface two">
                </div>
                <form onSubmit={emitMessage} className="interface three">
                    <input onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Message..." className="sendMessageInput"></input>
                </form>
            </div>
        </div>
    )
}
export default Chat