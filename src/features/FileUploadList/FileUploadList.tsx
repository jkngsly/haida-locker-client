// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId } from '../FolderTree/FolderTreeSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks"

interface Props {
    id: string
}

const FileUploadList: React.FC<Props> = (props) => {
    return (
        <div>
        </div>
    )
};

export default FileUploadList;