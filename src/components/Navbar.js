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
                        <h3>Home</h3>
                </Link>
                <Link to='profile' className={"imageBox" + (loc.pathname == '/profile' ? ' active' : '')}>
                        <img src='/images/Profile.png'/>
                        <h3>Profile</h3>
                </Link>
                <Link to='friend' className={"imageBox" + (loc.pathname == '/friend' || loc.pathname == '/friend/all' || loc.pathname == '/pending' || loc.pathname == '/friend/friendrequest' || loc.pathname == '/friend/search' ? ' active' : '')}>
                        <img src='/images/Friend.png'/>
                        <h3>Friends</h3>
                </Link>
                <Link to='settings' className={"imageBox" + (loc.pathname == '/settings' ? ' active' : '')}>
                        <img src='/images/Gear.png'/>
                        <h3>Settings</h3>
                </Link>
            </div>
        </div>
        <Outlet />
    </>
    )
}

export default NavBar