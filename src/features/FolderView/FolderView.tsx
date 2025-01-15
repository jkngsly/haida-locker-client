// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId } from '../FolderTree/folderTreeSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetFilesQuery } from './FolderViewApiSlice'
import FileThumbnail from '../FileThumbnail/FileThumbnail'
import HeroIcon from '../../components/HeroIcon'

const FolderView: React.FC = () => {
    //const { data, isLoading, error } = useGetFilesQuery()
    const folderId = useAppSelector(selectId)
    const { data, isLoading, error } = useGetFilesQuery({ folderId: folderId || "root" })
    
    if(!isLoading && data) { 
        return (
            <div id="folder-view">
                <div className="w-full folder-toolbar text-right flex flex-row  pwd  px-4 justify-between">
                    <div className="order-1">Home</div>
                    <div className="order-2 flex flex-row">
                        <HeroIcon name="ArrowLongUpIcon" />
                    </div>
                </div>
                <div className="file-grid">

                {data.length > 0 && data.map((file, index) => (
                    <FileThumbnail key={index} id={file.id}/> 
                ))}
                {!data.length && (
                    <div>
                        No files uploaded
                    </div>
                )}
                </div>
            </div>
        )
    }
    
}

export default FolderView