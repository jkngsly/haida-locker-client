// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import Button from '@components/Button';

interface Props {
}

const FileUploadList: React.FC<Props> = (props) => {
    return (
        <>
            <Button text="Upload File" heroIcon="CloudArrowUp" />
            <Button text="Create Folder" heroIcon="FolderPlus" />
        </>
    )
};

export default FileUploadList;