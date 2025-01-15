// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setId, selectId, setPath } from './folderTreeSlice'
import { useGetRootFoldersQuery } from './folderTreeApiSlice'
import FolderTreeChild from "./FolderTreeChild"
import HeroIcon from '../../components/HeroIcon'

const FolderTree: React.FC = () => {
    const dispatch = useAppDispatch()
    const folderId = useAppSelector(selectId)
    const { data, isLoading, error } = useGetRootFoldersQuery()

    const handleHomeCLick = () => {
        dispatch(setId("root"))
        dispatch(setPath("Home"))
    }

    const handleActiveClass = () => { 
        return folderId == "root" ? "active" : ""
    }

    if (!isLoading && data) {

        return (
            <ul id="folder-tree">
                <li><a className={handleActiveClass()} onClick={handleHomeCLick}><HeroIcon name="FolderIcon" />Home</a></li>
                {data.children && data.children.map(function (c) {
                    return (
                        <FolderTreeChild key={c.id + "_parent"} child={{
                            id: c.id,
                            name: c.name,
                            path: c.path,
                            children: c.children
                        }} />
                    )
                })}
            </ul>
        )
    }
}

export default FolderTree