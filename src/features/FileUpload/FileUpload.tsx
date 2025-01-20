// components/FolderTree.tsx
import React from 'react'
import Button from '@components/Button';
import UploadFileInterface from './FileUploadInterface'
import { setUploadActive, setUploadFiles } from '@/features/FileUpload/FileUploadSlice';
import { useAppDispatch } from '@/app/hooks';

interface Props {

}

const fileUpload: React.FC<Props> = (props) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()

    const handleUploadClick = (): void => {
        fileInputRef.current?.click();
    }

    const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>): void => { 
        if (e.target.files) {

            //setFolderTreeLocked(true);
      
            const files: UploadFileInterface[] = [];
            [...e.target.files].map((file: File) => { 
              // FolderView icons
              files.push({
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file)
              });
            });

            dispatch(setUploadFiles(files))
            dispatch(setUploadActive(true))
        }
    }


    return (
        <>
        
            <input
                type="file"
                ref={fileInputRef}
                multiple
                style={{ display: 'none' }}
                onChange={handleUploadChange}
                id="upload" />
            <Button text="Upload File" onClick={handleUploadClick} heroIcon="CloudArrowUp" />
            <Button text="Create Folder" heroIcon="FolderPlus" />
        </>
    )
};

export default fileUpload;