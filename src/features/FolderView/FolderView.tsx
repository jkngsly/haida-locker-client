// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId, selectName, selectPath } from '@/features/FolderTree/FolderTreeSlice'
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { useGetFilesQuery } from './FolderViewApiSlice'
import { selectUploadFiles } from '@/features/FileUpload/FileUploadSlice'
import FileThumbnail from '@features/FileThumbnail/FileThumbnail'
import FileUploadThumbnail from '@features/FileThumbnail/FileUploadThumbnail'
import HeroIcon from '@components/HeroIcon'

const FolderView: React.FC = () => {
    //const { data, isLoading, error } = useGetFilesQuery()
    const folderId = useAppSelector(selectId)
    const folderPath = useAppSelector(selectPath)
    const folderName = useAppSelector(selectName)
    const uploadFiles = useAppSelector(selectUploadFiles)

    const { data, isLoading, error } = useGetFilesQuery({ folderId: folderId || "root" })

    if (!isLoading && data) {
        return (
            <div id="folder-view">
                <div className="w-full folder-toolbar text-right flex flex-row  pwd  px-4 justify-between">
                    <div className="order-1 folder-path">
                        <HeroIcon name="ArrowTurnDownRight" />
                        {folderPath.replace(folderName, "")}
                        <span>{folderName}</span>
                    </div>
                    <div className="order-2 flex flex-row">

                        <HeroIcon name="ArrowLongUp" />
                        <a>
                            <HeroIcon name="Cog6Tooth" />
                            Settings
                        </a>

                    </div>
                </div>
                {uploadFiles.length > 0 && 
                    <div className="file-grid file-upload-list">
                        {uploadFiles.map((file, index) => (
                            <FileUploadThumbnail key={index} file={file} />
                        ))}
                    </div>
                }
                {data.length > 0 && (
                    <div className="file-grid">
                        {data.map((file, index) => (
                            <FileThumbnail key={index} id={file.id} />
                        ))}
                    </div>
                )}
                {!data.length && (
                    <div className="folder-empty">
                        {/* TODO: Upload trigger */}
                        <a title="Upload">
                            <HeroIcon name="CloudArrowUp" />
                        </a>
                    </div>
                )}
            </div>
        )
    }
}

export default FolderView