// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from "../../app/hooks"
import { setId } from './folderTreeSlice'
import { useGetRootFoldersQuery } from './folderTreeApiSlice'
import FolderTreeChild from "./FolderTreeChild"

const FolderTree: React.FC = () => {
    const dispatch = useAppDispatch()

    const { data, isLoading, error } = useGetRootFoldersQuery()

    const handleHomeCLick = () => {
        dispatch(setId("root"))
    }

    if (!isLoading && data) {
        return (
            <ul>
                <li><a onClick={handleHomeCLick}>Home</a></li>
                {data.children && data.children.map(function (c) {
                    return (
                        <FolderTreeChild key={c.id + "_parent"} child={{
                            id: c.id,
                            name: c.name,
                            children: c.children
                        }} />
                    )
                })}
            </ul>
        )
    }
}

export default FolderTree