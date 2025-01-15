// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from "../../app/hooks"
import { setId } from './folderTreeSlice';
import { useGetRootFoldersQuery } from './folderTreeApiSlice'
import TreeChild from "./FolderTreeChild"

const FolderTree: React.FC = () => {
    const dispatch = useAppDispatch()

    const { data, isLoading, error } = useGetRootFoldersQuery();

    const handleCLick = () => {
        dispatch(setId("root"))
    }

    if (!isLoading && data) {
        return (
            <ul>
                <li><a onClick={handleCLick}>Home</a></li>
                {data.children && data.children.map(function (c) {
                    return (
                        <TreeChild key={c.id + "_parent"} child={{
                            id: c.id,
                            name: c.name,
                            children: c.children
                        }} />
                    )
                })}
            </ul>
        );
    }
};

export default FolderTree;