



const MessageItem = ({item, i, arr}) => {

    return (
        <div style={{marginTop : (i - 1 < 0  || arr[i].user_id !== arr[i-1].user_id ? '1rem': '0')}} className="messageBox">
            {
            i - 1 < 0  || arr[i].user_id !== arr[i-1].user_id ? 
                <>
                <div className="circleMessageBox">
                    <div className="cirlce">
                    <img src='/images/Person.png'/>
                    </div>
                </div>
                <div className="usernameMessage">
                    <div className="messageUsernameBox">
                        <p className="userName">{item.username} </p>
                        <p className="userDate">{item.date}</p>
                    </div>
                    <p className="message">{item.message}</p>
                </div>
                </>

            :
            <>
            <div className="singleMessage">
            <p className="message">{item.message}</p>
            </div>
            </>
            }

        </div>
    )
}

export default MessageItem