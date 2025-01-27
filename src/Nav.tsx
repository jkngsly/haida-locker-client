import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FolderTree from "@features/drive/FolderTree/FolderTree"
import Logo from '@images/haida.png'
import '@sass/Nav.scss'
import { setToken } from "@features/auth/authSlice"
import { useAppDispatch } from '@/app/hooks'

function Nav() {
    const [count, setCount] = React.useState(0)
    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const links = [
        {
            to: "portal/drive",
            svgDraw: "M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z",
            text: "Drive",
            folders: true
        },
        {
            to: "portal",
            svgDraw: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
            text: "Dashboard",
        },
        {
            to: "portal/settings",
            svgDraw: "M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5",
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={link.svgDraw} />
                                    </svg>
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