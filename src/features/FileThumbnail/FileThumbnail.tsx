// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId } from '../FolderTree/folderTreeSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetFileQuery } from './FileThumbnailApiSlice';

interface Props {
    id: string
}

const FileThumbnail: React.FC<Props> = (props) => {
    const { data, isLoading, error } = useGetFileQuery(props.id)
    
    if (!isLoading) {
        return (
            <div>{ data.name }</div>
        )
    }
};

export default FileThumbnail;