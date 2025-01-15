// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId } from '../FolderTree/folderTreeSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetFileQuery } from './FileThumbnailApiSlice'

interface Props {
    id: string
}

const FileThumbnail: React.FC<Props> = (props) => {
    const { data, isLoading, error } = useGetFileQuery(props.id)
    
    if (!isLoading && data) {
        const url = "http://localhost:4000/file/" + data.id + "/download"
        return (
            <div>
                <a href={url} target="tab">{ data.name }</a><br></br>
            </div>
        )
    }
}

export default FileThumbnail