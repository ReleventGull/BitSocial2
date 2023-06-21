import { useEffect, useState } from 'react'
import {getPendingRequest, deleteRequest} from '../../api/users'
import { useOutletContext } from 'react-router-dom'


const Pending = ({token, setCounter, setSentMessage, setNotifClass, notifClass}) => {
    const [pending, setPending] = useState('')
    const [count, setCount] = useState('')
    const {index, setIndex, hoverStyle} = useOutletContext()

    const getPending = async() => {
            const response = await getPendingRequest(token)
            setCount(response.count)
            setPending(response.response)
    }

    useEffect(() => {
        getPending()  
    }, [])

    const deleteR = async(id) => {
        for(let i = 0; i < pending.length; i++) {
            if (pending[i].id == id) {
                pending.splice(i, 1)
            }
        }
        const response = await deleteRequest(id)
        if(notifClass) {
            setCounter(0)
        }else {
            setNotifClass('active')
        }
        setSentMessage(response.message)
    }
    return (
        <div className="searchBody">
             <p className='countFriends'>Pending - {count}</p>
             {
                !pending ? null : 
                pending.map((user, i) => 
                    <div style={i == index ? hoverStyle : null} onMouseLeave={() => setIndex(null)}  onMouseOver={() => setIndex(i + 1)} className={"searchUserBody " + i}>
                        <h2>{user.username}</h2>
                            <div className="userBodyIconBox">
                            <img onClick={() => deleteR(user.id)}className="userBodyIconImage" src='/images/Clear.png'/>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default Pending