import { useEffect, useState } from 'react'
import {getPendingRequest} from '../../api/users'
import { useOutletContext } from 'react-router-dom'


const Pending = ({token}) => {
    const [pending, setPending] = useState('')
    const {index, setIndex, hoverStyle} = useOutletContext()

    
    
    console.log(index)
    const getPending = async() => {
            const response = await getPendingRequest(token)
            setPending(response)
    }

    useEffect(() => {
        getPending()  
    }, [])


    return (
        <div className="searchBody">
             {
                !pending ? null : 
                pending.map((user, i) => 
                    <div style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className={"searchUserBody " + i}>
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                                
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default Pending