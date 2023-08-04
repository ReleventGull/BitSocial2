import { useEffect, useState, } from "react"
import { useLocation, useParams } from "react-router-dom"
import {sendMessage, getMessages} from '../api/chat'
import { setMessages, addMessage } from "../redux/MessageAction"
import { useDispatch, useSelector } from "react-redux"
import MessageItem from './MessageItem'

const Chat = ({token, socket}) => {
const [ message, setMessage ] = useState('')
const loc = useLocation()
const params = useParams()
const dispatch = useDispatch()
const {arr} = useSelector(state => state.messages)

const fetchMessage = async() => {
    const response = await getMessages({token: token, chatId: params.id})
        dispatch(setMessages(response))
}

useEffect(() => {
    socket.emit('pathname', {
        path: loc.pathname
    })
    fetchMessage()
}, [])

const emitMessage = async(e) => {
    e.preventDefault()
    if(!message) return
    const response = await sendMessage({token: token, message: message, chatId: params.id})
    if(!response.error) {
        console.log(response)
        dispatch(addMessage(response))
        setMessage('')
    }
}

    return (
        <div className="outlet Chat">
            <div className="chatInterface">
                <div className="interface one">
                </div>
                <div className="interface two">
                    {
                        arr.length < 1 ?
                            null
                            :
                            arr.map((item, i, arr) =>
                                <MessageItem item={item} i={i} arr={arr}/>
                            )
                    }
                </div>
                <form onSubmit={emitMessage} className="interface three">
                    <input onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Message..." className="sendMessageInput"></input>
                </form>
            </div>
        </div>
    )
}
export default Chat