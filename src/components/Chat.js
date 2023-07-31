import { useState } from "react"



const Chat = ({token}) => {




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