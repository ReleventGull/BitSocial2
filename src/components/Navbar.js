import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"

import {useEffect, } from 'react'


const NavBar = () => {
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
                <Link className={"imageBox" + (loc.pathname == '/home' ? ' active' : '')} >
                    <img src='/images/home.png'/>
                </Link>
                <Link className={"imageBox" + (loc.pathname == '/chat' ? ' active' : '')}>
                    <img src='/images/Chat.png'/>
                </Link>
                <Link className={"imageBox" + (loc.pathname == '/profile' ? ' active' : '')}>
                    <img src='/images/Profile.png'/>
                </Link>
                <Link className={"imageBox" + (loc.pathname == '/gear' ? ' active' : '')}>
                    <img src='/images/Gear.png'/>
                </Link>
                <div className="imageBox">
                    <img src='/images/Gear.png'/>
                </div>
            </div>
        </div>
        <Outlet />
    </>
    )
}

export default NavBar