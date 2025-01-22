// components/FolderTree.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useGetFileQuery } from '@features/api/fileApi'
import HeroIcon from '@components/HeroIcon'
import FileApiResponse from './FtApiResponse.interface'

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

    const { data, isLoading, error } = useGetFileQuery(props.id)
    const [showMenu, setShowMenu] = React.useState<boolean>(false)
    const dropdownRef = useClickOutside(() => setShowMenu(false));

    const handleDropdownClick = () => {
        setShowMenu(showMenu ? false : true)
    }

    if (!isLoading && data) {
        const file: FileApiResponse = { ...data }
        console.log(file)
        const url = "http://localhost:4000/file/" + file.id + "/download"
        const video = file.mime_type.indexOf("video") != -1
        const image = file.mime_type.indexOf("image") != -1
        const icon = !video && !image

        const getImageBackground = () => {
            return image ? {
                backgroundImage: "url(http://localhost:4000/file/" + file.id + "/download)"
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
                        <a><HeroIcon name="CloudArrowDown" />Download</a>
                        <a><HeroIcon name="ArrowUpOnSquare" />Share</a>
                        <a className="pink"><HeroIcon name="Trash" />Delete</a>
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