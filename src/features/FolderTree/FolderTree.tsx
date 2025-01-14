// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useGetRootFoldersQuery } from './folderTreeApiSlice'
import TreeChild from "./TreeChild"

const FolderTree: React.FC = () => {
    const { data, isLoading, error } = useGetRootFoldersQuery();

    if (!isLoading) {
        return (
            <ul>
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