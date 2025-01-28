// components/FolderTree.tsx
import React from 'react'
import Button from '@components/Button'
import { useAppDispatch } from '@app/hooks'
import { useUploadFileMutation } from '@features/api/fileApi'
import { ding } from '@features/notifications/notificationsSlice'

interface Props {

}

const fileUpload: React.FC<Props> = (props) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const [uploadFile, { isLoading, isSuccess, error }] = useUploadFileMutation()

    const handleUploadClick = (): void => {
        fileInputRef.current?.click();
    }

    const handleUploadChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (e.target.files) {

            const formData = new FormData();
            [...e.target.files].map((file) => {
                formData.append('files[]', file);
            });

            try {
                await uploadFile(formData).unwrap().then(() => { 
                    fileInputRef.current.value = ''
                    dispatch(ding({
                        text: "Uploaded",
                        icon: "CheckCircle",
                        seen: false
                    }))
                })
            } catch (err) {
                console.error('Upload failed: ', err);
            }
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