import {useState} from 'react'
const  searchStates = ['All', 'Search', 'Friend Request', 'Pending']
const Search = () => {
    const [searchClass, setSearchClass] = useState('')
    const [active, setActive] = useState('All')
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className="outlet search">
            <div className="topSearch">
                <div className="searchFriendOptions">
                {
                    searchStates.map(state => 
                        <span onClick={() => setActive(state)} className={'searchStateOptions ' + (active == state ? 'active' : '' )}>{state}</span>
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
        </div>
    )
}

export default Search