// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { Scrollbars } from 'react-custom-scrollbars-2';
import { setId, selectId, setPath, setName } from './folderTreeSlice'
import FolderTreeChild from "./FolderTreeChild"
import { useGetRootFoldersQuery } from '@features/api/folderApi'
import HeroIcon from '@components/HeroIcon'

const FolderTree: React.FC = () => {
    const folderId = useAppSelector(selectId)
    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useGetRootFoldersQuery({})

    const handleHomeCLick = () => {
        dispatch(setId("root"))
        dispatch(setPath("Home"))
        dispatch(setName("Home"))
    }

    const handleActiveClass = () => {
        return folderId == "root" ? "active" : ""
    }

    if (!isLoading && data) {
        return (
            <div>
                <ul id="folder-tree">
                    <Scrollbars style={{ width: "98%", height: 300 }}>
                        <li><a className={handleActiveClass()} onClick={handleHomeCLick}><HeroIcon name="Folder" />Home</a></li>
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