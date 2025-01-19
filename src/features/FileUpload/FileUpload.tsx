// components/FolderTree.tsx
import React from 'react'
import Button from '@components/Button';

interface Props {
}

const FileUploadList: React.FC<Props> = (props) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <>
        
        <input
            type="file"
            //ref={fileInputRef}
            multiple
            style={{ display: 'none' }}
            //onChange={}
            id="upload" />
            <Button text="Upload File" heroIcon="CloudArrowUp" />
            <Button text="Create Folder" heroIcon="FolderPlus" />
        </>
    )
};

export default FileUploadList;