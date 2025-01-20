// components/FolderTree.tsx
import React, { useEffect, useRef, useState } from 'react'
import { useGetFileQuery } from './FileThumbnailApiSlice'
import HeroIcon from '@components/HeroIcon'
import FileUploadInterface from '@features/FileUpload/FileUploadInterface'
import formatBytes from '@helpers/formatBytes';

interface Props { 
    file: FileUploadInterface
}

const FileThumbnail: React.FC<Props> = (props) => {
    const ref = useRef(null);

    const video = props.file.type.indexOf("video") != -1
    const image = props.file.type.indexOf("image") != -1
    const icon = !video && !image

    const getImageBackground = () => {
        return image ? {
            backgroundImage: "url(" + props.file.url + ")"
        } : {}
    }

    const getThumbnailClassName = () => {
        const fileMedia = icon ? "" : "file-media"
        return "file-thumbnail " + fileMedia
    }

    return (
        <div className="file">
            <div className="file-header">
                <span>{props.file.name.substring(0, 20) + (props.file.name.length > 20 ? "..." : "")}</span>
            </div>
            <div className={getThumbnailClassName()} style={getImageBackground()}>
                <div className="file-information">
                    <div>{formatBytes(props.file.size)}</div>
                    <div></div>
                </div>
                {icon && <HeroIcon name="Document" />}
                {video &&
                    // @ts-ignore
                    <video id="background-video" autoPlay loop muted>
                        <source src={props.file.url} type="video/mp4" /> {/* TODO: correct mime format */}
                    </video>
                }
            </div>
        </div>
    )
}

export default FileThumbnail