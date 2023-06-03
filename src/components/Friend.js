import {useState, useEffect} from 'react'
import {Link, Outlet, useLocation, useNavigate, useOutletContext} from 'react-router-dom'

const  searchStates = ['All', 'Search', 'Request', 'Pending']
const Friend = () => {
    const [searchClass, setSearchClass] = useState('')
    const [searchValue, setSearchValue] = useState('')


    const navigate = useNavigate()
    const loc = useLocation()

    useEffect(() => {
        loc.pathname == '/search'
        navigate('/friend/all')
    }, [])


    
    return (
        <div className="outlet search">
            <div className="topSearch">
                <div className="searchFriendOptions">
                {
                    searchStates.map(state => 
                        <Link onClick={() => setSearchValue('')} to={`${state.split(' ').join('').toLowerCase()}`}  className={'searchStateOptions ' + (loc.pathname == `/friend/${state.split(' ').join('').toLowerCase()}` ? 'active' : '' )}>{state}</Link>
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
                    <Outlet context={[searchValue, setSearchValue]}/>
        </div>
    )
}

export default Friend