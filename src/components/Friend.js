import {useState, useEffect} from 'react'
import {Link, Outlet, useLocation, useNavigate, useOutletContext} from 'react-router-dom'

const  searchStates = ['All', 'Search', 'Request', 'Pending']
const Friend = ({socket}) => {
    const [index, setIndex] = useState(null)
    const [message, setMessage] = useState('')
    const [header, setHeader ] = useState('')
    const [searchClass, setSearchClass] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const {unread, setUnread} = useOutletContext()
    let hoverStyle = {
        borderTop: '1px solid transparent'
    }
    

    const navigate = useNavigate()

    const loc = useLocation()

    useEffect(() => {
        
        if(loc.pathname == '/friend'){
            navigate('/friend/all')
            socket.emit('pathname', {
                path: loc.pathname
            })
        } 
    }, [loc.pathname])

    useEffect(() => {
        switch(loc.pathname) {
            case '/friend/all' :
                setHeader('Friends - ')
                break;
            case '/friend/request':
                setHeader("Requests - ")
                break;
            case '/friend/pending':
                setHeader("Pending - ")
                break;
            default:
                setHeader('')
        }
    }, [loc])

    
    return (
        <div className="outlet search">
            <div className="topSearch">
                <div className="searchFriendOptions">
                {
                    searchStates.map((state, i) => 
                        
                        <Link key={i} onClick={() => setSearchValue('')} to={`${state.split(' ').join('').toLowerCase()}`}  className={'searchStateOptions ' + (loc.pathname == `/friend/${state.split(' ').join('').toLowerCase()}` ? 'active' : '' )}>
                           
                            {state == 'Request' && unread > 0? 
                            <div className='frBubble2'>
                                {unread} 
                            </div>
                            : null}
                            {state}
                        </Link>
                        )
                }
                </div>
                <div className='searchEntryBox'>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
                    {
                        searchValue ? 
                        <img className='clearSearch' onClick={() => {setSearchValue(''), setSearchClass('searchAnimation')}} style={{cursor: 'pointer'}} src='/images/Clear.png'/>
                        :
                        <img className={searchClass} src='/images/Search.png'/>
                        
                    }
                </div>
                <p className='countFriends'>{header}{message}</p>
            </div>
            
            <Outlet context={{searchValue, setMessage, setSearchClass, index, setIndex, hoverStyle, setMessage, setUnread}}  />
        </div>
    )
}

export default Friend