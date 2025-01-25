// components/FolderTree.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useGetFileQuery, useDeleteFileMutation } from '@features/api/fileApi'
import HeroIcon from '@components/HeroIcon'
import Modal from '@components/Modal'
import { useAppDispatch } from '@/app/hooks'
import { ding } from '@/features/notifications/notificationsSlice'

interface Props {
    id: string
}

function useClickOutside(handler: Function) {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            {/* @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ */ }
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handler]);

    return ref;
}

const FileThumbnail: React.FC<Props> = (props) => {
    const ref = useRef(null);
    const dispatch = useAppDispatch()

    const { data, isLoading, error } = useGetFileQuery(props.id)
    const [deleteFile, {  }] = useDeleteFileMutation()
    
    const [showMenu, setShowMenu] = React.useState<boolean>(false)
    const dropdownRef = useClickOutside(() => setShowMenu(false));

    const handleDropdownClick = () => {
        setShowMenu(showMenu ? false : true)
    }

    if (!isLoading && data) {
        const file = data;
        
        const handleDeleteClick = () => {
            
            dispatch(ding({
                text: file.name + " Deleted",
                icon: "CheckCircle",
                actionText: "Undo",
                seen: true
            }))
            deleteFile(file.id)
        }

        const url = import.meta.env.VITE_API_BASE_URL + "/file/" + file.id + "/download"
        const video = file.mime_type.indexOf("video") != -1
        const image = file.mime_type.indexOf("image") != -1
        const icon = !video && !image

        const getImageBackground = () => {
            return image ? {
                backgroundImage: `url(${url})`
            } : {}
        }

        const getThumbnailClassName = () => {
            const fileMedia = icon ? "" : "file-media"
            return "file-thumbnail " + fileMedia
        }

        return (
            <div className="file">
                {showMenu && (
                    <div className="file-menu-dropdown" ref={dropdownRef}>
                        <a title="Download" target="tab" href={url}><HeroIcon name="CloudArrowDown" />Download</a>
                        <a title="Share options"><HeroIcon name="ArrowUpOnSquare" />Share</a>
                        <a title="Delete" className="pink" onClick={handleDeleteClick}><HeroIcon name="Trash" />Delete</a>
                    </div>
                )}
                <div className="file-header">
                    <HeroIcon name="EllipsisHorizontal" onClick={handleDropdownClick} />
                    <span>{data.name.substring(0, 20) + (data.name.length > 20 ? "..." : "")}</span>
                </div>
                <div className={getThumbnailClassName()} style={getImageBackground()}>
                    {icon && <HeroIcon name="Document" />}
                    {video &&
                        // @ts-ignore
                        <video id="background-video" autoPlay loop muted>
                            <source src={url} type="video/mp4" /> {/* TODO: correct mime format */}
                        </video>
                    }
                </div>
            </div>
        )
    }
}

export default FileThumbnail