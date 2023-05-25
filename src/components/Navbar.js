import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"

import {useEffect, } from 'react'


const NavBar = ({setToken}) => {
    const navigate = useNavigate()
    const loc = useLocation()
    useEffect(() => {
        if (loc.pathname == '/') {
            navigate('home')
        }
    }, [])
    return(
    <>
        <div className="navBar">
            <div className="navBarBox">
                <Link to='home' className={"imageBox" + (loc.pathname == '/home' ? ' active' : '')} >
                    <img src='/images/home.png'/>
                </Link>
                <Link to='chat' className={"imageBox" + (loc.pathname == '/chat' ? ' active' : '')}>
                    <img src='/images/Chat.png'/>
                </Link>
                <Link to='profile' className={"imageBox" + (loc.pathname == '/profile' ? ' active' : '')}>
                    <img src='/images/Profile.png'/>
                </Link>
                <Link to='settings' className={"imageBox" + (loc.pathname == '/settings' ? ' active' : '')}>
                    <img src='/images/Gear.png'/>
                </Link>
                <div onClick={() => {window.localStorage.removeItem('token'), setToken('')}} className="imageBox">
                    <img src='/images/Logout.png'/>
                </div>
            </div>
        </div>
        <Outlet />
    </>
    )
}

export default NavBar