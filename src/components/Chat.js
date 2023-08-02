import { useEffect, useState, } from "react"
import { useLocation } from "react-router-dom"


const Chat = ({token, socket}) => {
const loc = useLocation()

useEffect(() => {
    socket.emit('pathname', {
        path: loc.pathname
    })
}, [])



    return (
        <div className="outlet Chat">
            <div className="chatInterface">
                <div className="interface one">
                </div>
                <div className="interface two">
                </div>
                <div className="interface three">
                    <input placeholder="Message..." className="sendMessageInput"></input>
                </div>
            </div>
        </div>
    )
}
export default Chat