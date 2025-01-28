import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FolderTree from "@features/drive/FolderTree/FolderTree"
import Logo from '@images/haida.png'
import '@sass/Nav.scss'
import { setToken } from "@features/auth/authSlice"
import { useAppDispatch } from '@/app/hooks'
import HeroIcon from '@/components/HeroIcon'

function Nav() {
    const [count, setCount] = React.useState(0)
    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const links = [
        {
            to: "portal/drive",
            icon: "Server",
            text: "Drive",
            folders: true
        },
        {
            to: "portal",
            icon: "Home",
            text: "Dashboard",
        },
        {
            to: "portal/settings",
            icon: "AdjustmentsVertical",
            text: "Settings"
        },
    ];

    const handleLogoutClick = () => { 
        dispatch(setToken(null))
        navigate("/login")
    }

    return (
        <div id="navigation">
            <div>
                <div id="logo">
                    <img src={Logo} />Haida<span>ドライブ</span>
                </div>
                <div id="user" className="pl-5 pt-5 pb-5 flex">
                    <span className="flex flex-row justify-center align-middle">
                        <div className="rounded-full pfp w-12 h-12 border-2 border-slate-100"></div>
                        <div className="ml-3 flex flex-col">
                            <span>Kita Ruuki</span>
                            <span className="text-sm">Online</span>
                        </div>
                    </span>
                </div>
                <nav className="flex flex-col w-full">
                    {links.map((link, index) => {
                        return (
                            <div className={link.to} key={index}>
                                <NavLink to={link.to}>
                                    <HeroIcon name={link.icon} />
                                    {link.text}
                                </NavLink>
                                
                                {link.to == "portal/drive" && (
                                    <FolderTree />
                                )}
                            </div>
                        )
                    })}
                    <div onClick={handleLogoutClick}>
                        Logout
                    </div>
                </nav>
            </div>
        </div>
    )
}


export default Nav