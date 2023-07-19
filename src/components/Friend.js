import {useState, useEffect} from 'react'
import {Link, Outlet, useLocation, useNavigate, useOutletContext} from 'react-router-dom'
import { useSelector} from 'react-redux'
const  searchStates = ['All', 'Search', 'Request', 'Pending']
const Friend = ({socket}) => {
    const [index, setIndex] = useState(null)
    const [searchClass, setSearchClass] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const {count} = useSelector(state => state.unreadCount)
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



    return (
        <div className="outlet search">
            <div className="topSearch">
                <div className="searchFriendOptions">
                {
                    searchStates.map((state, i) => 
                        
                        <Link key={i} onClick={() => setSearchValue('')} to={`${state.split(' ').join('').toLowerCase()}`}  className={'searchStateOptions ' + (loc.pathname == `/friend/${state.split(' ').join('').toLowerCase()}` ? 'active' : '' )}>
                            {state == 'Request' && count > 0? 
                            <div className='frBubble2'>
                                {count} 
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
                
            </div>
            
            <Outlet context={{searchValue, setSearchClass, index, setIndex, hoverStyle}}  />
        </div>
    )
}

export default Friend