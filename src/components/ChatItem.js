

const ChatItem = ({username, id}) => {
    return (
        <div className="chatItemContainer">
            <div className="circleChat">
                <img src='/images/Person.png'/>
            </div>
            
            {username}
        </div>
    )
}

export default ChatItem