/*import * as React from 'react'
import { NavLink } from 'react-router-dom'
import Folders from 'features/folders/Folders'
function Nav() {
    const [count, setCount] = React.useState(0)

    const links = [
        {
            to: "/",
            svgDraw: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
            text: "Dashboard",
        },
        {
            to: "/vault",
            svgDraw: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
            text: "Vault",
            folders: true
        },
        {
            to: "/test",
            svgDraw: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
            text: "Confluence"
        },
        {
            to: "/test2",
            svgDraw: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
            text: "Model"
        },
    ];

    return (
        <div className="w-2/12 min-h-screen flex flex-col border-r dark:bg-gray-800 dark:border-r-gray-700 border-r-gray-700 bg-gray-800">
            <div className="w-full flex border-b border-b-slate-600 text-white">
                <div className="p-5">
                    <span className="flex flex-row justify-center align-middle">
                        <div className="rounded-full pfp w-12 h-12 border-2 border-slate-100"></div>
                        <div className="ml-3 flex flex-col">
                            <span>Kita Ruuki</span>
                            <span className="text-sm">Online</span>
                        </div>
                    </span>
                </div>
            </div>
            <nav className="p-5 flex flex-col w-full">
                {links.map((link, index) => {
                    return(
                        <>
                            <NavLink key={index} to={link.to} className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={link.svgDraw} />
                                </svg>
                                {link.text}
                            </NavLink>
                            {link.folders && <Folders /> }
                        </>
                    )
                })}
            </nav>
        </div>
    )
}


export default Nav*/