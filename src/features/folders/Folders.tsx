// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useGetRootFoldersQuery, useGetChildFoldersQuery } from './foldersApiSlice'
import Child from "./Child"

const Folders: React.FC = () => {
    const { data, isLoading, error } = useGetRootFoldersQuery();

    if (!isLoading) {
        return (
            <ul>
                {data.children && data.children.map(function (c) {
                    return (
                        <Child key={c.id + "_parent"} child={{
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

export default Folders;