    import { Link, useParams} from "react-router-dom"


const ChatItem = ({username, id, paramId, count, color}) => {
    const params = useParams()
    console.log("Color here", color)
    return (
        <Link  to={`chat/${id}`} className={`chatItemContainer ` + (params.id == id ? 'active' : '')}>
            <div style={{backgroundColor: `#${color}`}} className="circleChat">
                <img src='/images/Person.png'/>
            </div>
            <p className="navBarUserName">{username}</p> 
            {
                count > 0 ? <p>{count} </p>: null
            }
        </Link>
    )
}

export default ChatItem