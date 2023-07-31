

const ChatItem = ({username, id}) => {
    return (
        <div className="chatItemContainer">
            <div className="circleChat">
                <img src='/images/Person.png'/>
            </div>
            
           <p className="navBarUserName">{username}</p> 
        </div>
    )
}

export default ChatItem