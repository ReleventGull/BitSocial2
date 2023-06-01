import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import {searchUsers} from '../../api/users'


const Search = ({token}) => {
    const [searchValue, setSearchValue] = useOutletContext()
    const [result, setResults] = useState('')
    
    const searchForUsers = async() => {
        const response = await searchUsers({query: searchValue, token: token})
        setResults(response)
    }   
    
    useEffect(() => {
        if(searchValue) {
            searchForUsers()
        }else {
            setResults('')
        }
    }, [searchValue])
    
    return (
        <div className="searchBody">
            Hi!erghergergerge
        </div>
    )
}

export default Search