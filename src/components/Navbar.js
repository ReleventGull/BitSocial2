import { Link, useLocation } from "react-router-dom"

import {useState} from 'react'


const NavBar = () => {
    const [chats, setChats] = useState('')
    const [page, currentPage ] = useState('home')
    
    const loc = useLocation()
    console.log(loc)
    return(
        <div className="navBar">
            <div className="navBarBox">
                <Link className={"imageBox" + (page == 'home' ? ' active' : '')} >
                    <img src='/images/home.png'/>
                </Link>
                <Link className={"imageBox" + (page == 'chat' ? ' active' : '')}>
                    <img src='/images/Chat.png'/>
                </Link>
                <Link className={"imageBox" + (page == 'profile' ? ' active' : '')}>
                    <img src='/images/Profile.png'/>
                </Link>
                <Link className={"imageBox" + (page == 'gear' ? ' active' : '')}>
                    <img src='/images/Gear.png'/>
                </Link>
                <div className="imageBox">
                    <img src='/images/Gear.png'/>
                </div>
            </div>
        </div>
    )
}

export default NavBar