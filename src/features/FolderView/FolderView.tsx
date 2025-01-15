// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId } from '../FolderTree/folderTreeSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetFilesQuery } from './FolderViewApiSlice';
import FileThumbnail from '../FileThumbnail/FileThumbnail'

const FolderView: React.FC = () => {
    //const { data, isLoading, error } = useGetFilesQuery();
    const folderId = useAppSelector(selectId)
    const { data, isLoading, error } = useGetFilesQuery({ folderId: folderId || "root" });
    
    if(!isLoading && data) { 
        return (
            <div>
            {data.length && data.map((file, index) => (
                <FileThumbnail key={file.id} id={file.id}/> 
            ))}
            </div>
        )
    }
    
};

export default FolderView;