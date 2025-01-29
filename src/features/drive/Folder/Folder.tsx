// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId, selectName, selectPath } from '@features/drive/FolderTree/folderTreeSlice'
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

const Folder: React.FC<Props> = (props) => {
    const folderId = useAppSelector(selectId)
    const folderPath = useAppSelector(selectPath)
    const folderName = useAppSelector(selectName)
    const uploadFiles = useAppSelector(selectUploadFiles)

    // @ts-ignore
    let { data, isLoading, error } = (props.search && props.search.length > 0 ?
        // @ts-ignore
        useSearchQuery({ text: props.search })
        :
        useGetFilesQuery({ folderId: folderId || "root" }))


    const handleUploadClick = () => {

    }

    if (!isLoading && data) {
        return (
            <div id="folder" className="box">
                    <div className="w-fullflex flex-row  px-4 ">
                        <div className="folder__path">
                            <HeroIcon name="ArrowTurnDownRight" />
                            {folderPath.replace(folderName, "")}
                            <span>{folderName}</span>
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

export default Folder