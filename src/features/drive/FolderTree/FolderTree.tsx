// components/FolderTree.tsx
import React, { useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useAppDispatch, useAppSelector } from "@app/hooks"
import HeroIcon from '@components/HeroIcon'
import { useGetRootFoldersQuery } from '@features/api/folderApi'
import { setFolder, selectFolder } from './folderTreeSlice'
import FolderTreeChild from "./FolderTreeChild"
import '@sass/FolderTree.scss'
import { useNavigate } from 'react-router-dom';

const FolderTree: React.FC = () => {
    const selectedFolder = useAppSelector(selectFolder)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { data, isLoading, error } = useGetRootFoldersQuery({})

    if (!isLoading && data) {

        const handleHomeClick = () => {
            navigate("portal/folder")

            dispatch(setFolder(data))
        }

        const handleActiveClass = () => {
            return selectedFolder.id == data.id ? "active" : ""
        }

        return (
            <div>
                <ul id="folder-tree">
                    <Scrollbars style={{ width: "98%", height: 300 }}>
                        <li><a className={handleActiveClass()} onClick={handleHomeClick}><HeroIcon name="Folder" />Home</a></li>
                        {data.children && data.children.map(function (child) {
                            return (
                                <FolderTreeChild key={child.id + "_parent"} folder={child} />
                            )
                        })}
                    </Scrollbars>
                </ul>
            </div>
        )
    }
}

export default FolderTree