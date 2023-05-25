import { useState } from "react"

const activeStyle = {
    backgroundColor: 'var(--third)',
    borderRadius: '12px',
    color: 'var(--primary)',
    transition: '.2s'
}

const Chat = () => {
const [active, setActive] = useState('search')
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
                    <input className="searchInput" placeholder="Search..."></input>
                }
            </div>
        </div>
    )
}
export default Chat