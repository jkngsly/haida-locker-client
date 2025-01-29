import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FolderTree from "@features/drive/FolderTree/FolderTree"
import Logo from '@images/haida.png'
import '@sass/Nav.scss'
import { setToken } from "@features/auth/authSlice"
import { useAppDispatch } from '@/app/hooks'
import HeroIcon from '@/components/HeroIcon'

const SidebarItem = ({ item }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const toggleCollapse = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <li>
            <NavLink to={item.to} onClick={toggleCollapse}>
                <HeroIcon name={item.icon} />
                {item.name}
            </NavLink>

            {item.to == "portal/drive" && isOpen && (
                <FolderTree />
            )}

            {item.children && isOpen && (
            <ul>
                {item.children.map((child) => (
                <SidebarItem key={child.name} item={child} />
                ))}
            </ul>
            )}
        </li>
    );
  };

function Nav() {
    const [asdacsdsa, setCount] = React.useState(0)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const items = [
        {
            to: "portal/drive",
            icon: "Server",
            name: "My Drive"
        },
        {
            to: "portal/settings",
            icon: "AdjustmentsVertical",
            name: "Settings",
            children: [
                {
                    to: "portal/settings/edit-profile",
                    icon: "UserCircle",
                    name: "Edit Profile"
                },
                {
                    to: "portal/settings/manage-users",
                    icon: "UserGroup",
                    name: "Manage Users"
                },
            ]
        },
    ];

    return (
        <div id="navigation">
            <div id="logo">
                {/*&Haida<span></span>*/}
                Haida<span>ドライブ</span>
            </div>
            <nav className="flex flex-col w-full">
                {items.map((item) => {
                    return (
                        <SidebarItem key={item.name} item={item} />
                    )
                })}
            </nav>
            {/*
            <div id="user" className="pl-5 pt-5 pb-5 flex">
                <span className="flex flex-row justify-center align-middle">
                    <div className="rounded-full pfp w-12 h-12 border-2 border-slate-100"></div>
                    <div className="ml-3 flex flex-col">
                        <span>Kita Ruuki</span>
                        <span className="text-sm">Online</span>
                    </div>
                </span>
            </div> */}  
        </div>
    )
}


export default Nav