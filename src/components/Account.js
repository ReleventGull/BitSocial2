import { useEffect, useState } from "react"
import {useLocation} from 'react-router-dom'
import {getMe} from '../api/users'

const Account = ({socket, token, setToken}) => {
    const [user, setUser] = useState('')
    const loc = useLocation()

    const fetchMe = async() => {
        const response = await getMe(token)
        setUser(response)
    }
    useEffect(() => {
        socket.emit('pathname', {
            path: loc.pathname
        })
        fetchMe()
    }, [])

    const createDate = () => {
        const months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December']
        const date = user.date_joined.split('T')[0].split('-')
        return `${months[Number(date[1]) - 1]} ${date[2]}, ${date[0]}`
    }
    return (
        
        <div className="outlet Profile">
            {
            !user ? null :
                <div className="profileContainer">
                    <h2 className="myAccountHeading">My Account</h2>
                    <div className="profileInformation">
                        <h3 className="usernameProfileBox">{user.username}</h3>
                        <div className="informationContainer">
                            <div className="profileBox one">
                                <div className="profileLabelBox">
                                <label className="profileLabel">NAME</label>
                                <p>{user.username}</p>
                                </div>
                                <button className="editProfileButton">Edit</button>
                            </div>
                            <div className="profileBox one">
                                <div className="profileLabelBox">
                                <label className="profileLabel">EMAIL</label>
                                <p>none</p>
                                </div>
                                <button className="editProfileButton">Edit</button>
                            </div>
                            <div className="profileBox one">
                                <div className="profileLabelBox">
                                <label className="profileLabel">PHONE NUMBER</label>
                                <p>none</p>
                                </div>
                                <button className="editProfileButton">Edit</button>
                            </div>
                        </div>
                    </div>

                
            </div>
            }
        </div>
    )
}
export default Account