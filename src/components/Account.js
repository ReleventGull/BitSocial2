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
                  <div className="profileTop">
                    <h2>{user.username}</h2>
                    <p className="memberSince">Member Since: {createDate()}</p>
                 </div>
                 <div className="aboutBox">
                    <div>
                      <p>About</p>
                      <button>Change</button>
                    </div>
                    <p className="aboutDesc">dwajkldwajkla;wdjklawdjklawjdlkawdjklawdjkl;awdjkl;awdkjlawdjkawdkjladwkjawdkjawdkjkjdawjkawdq</p>
                  </div>
                  <div className="accountMenu">
                  <div className="imageBox profile">
                        <img src='/images/Profile.png'/>
                        <h3>Account</h3>
                     </div>
                    <div onClick={() => {window.localStorage.removeItem('token'), setToken('')}} className="imageBox profile">
                        <img src='/images/Logout.png'/>
                        <h3>Logout</h3>
                     </div>
                  </div>
            </div>
            }
        </div>
    )
}
export default Account