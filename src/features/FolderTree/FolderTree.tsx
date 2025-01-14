// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useGetRootFoldersQuery } from './folderTreeApiSlice'
import TreeChild from "./TreeChild"
import { setId } from './folderTreeSlice';
import { useAppDispatch } from "../../app/hooks"

const FolderTree: React.FC = () => {
    const dispatch = useAppDispatch()

    const { data, isLoading, error } = useGetRootFoldersQuery();

    const handleCLick = () => {
        dispatch(setId("root"))
    }

    if (!isLoading) {
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