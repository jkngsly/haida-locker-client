// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectFolder } from '@features/drive/FolderTree/folderTreeSlice'
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { useGetFilesQuery } from '@features/api/folderApi'
import { useSearchQuery } from '@features/api/fileApi'
import { selectUploadFiles } from '@features/drive/FileUpload/fileUploadSlice'
import FileThumbnail from '@features/drive/FileThumbnail/FileThumbnail'
import FileUploadThumbnail from '@/features/drive/FileThumbnail/FileUploadThumbnail'
import HeroIcon from '@components/HeroIcon'
import Button from '@/components/Button'
import '@sass/Folder.scss'

interface Props {
    search?: '' | null
}

const FolderGrid: React.FC<Props> = (props) => {
    const selectedFolder = useAppSelector(selectFolder)
    const uploadFiles = useAppSelector(selectUploadFiles)

    // @ts-ignore
    let { data, isLoading, error } = (props.search && props.search.length > 0 ?
        // @ts-ignore
        useSearchQuery({ search: props.search, folderId: selectedFolder.id})
        :
        useGetFilesQuery({ folderId: selectedFolder.id }))


    const handleUploadClick = () => {

    }

    if (!isLoading && data) {
        return (
            <div id="folder" className="box">
                <div className="w-fullflex flex-row  px-4 ">
                    <div className="folder__path">
                        <HeroIcon name="ArrowTurnDownRight" />
                        {selectedFolder.id}
                    </div>
                </div>
                {data.length > 0 && (
                    <div className="folder__grid">
                        {data.map((file, index) => (
                            <FileThumbnail key={index} id={file.id} />
                        ))}
                    </div>
                )}
                {!data.length && (
                    <div className="folder__grid--empty">
                        {/* TODO: Upload trigger */}
                        <a title="Upload" onClick={handleUploadClick}>
                            <HeroIcon name="CloudArrowUp" />
                        </a>
                    </div>
                )}
            </div>
        )
    }
}

export default FolderGrid