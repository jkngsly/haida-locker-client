// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId } from '../FolderTree/folderTreeSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetFileQuery } from './FileThumbnailApiSlice'
import HeroIcon from '../../components/HeroIcon'
import FileApiResponse from './FtApiResponse.interface'

interface Props {
    id: string
}

const FileThumbnail: React.FC<Props> = (props) => {
    const { data, isLoading, error } = useGetFileQuery(props.id)

    
    if (!isLoading && data) {
        const file: FileApiResponse = {...data}
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
                <div className="file-header">
                  <HeroIcon name="EllipsisHorizontalIcon" />
                 <span>{data.name.substring(0, 20) + (data.name.length > 20 ? "..." : "")}</span>
                </div>
                <div className={getThumbnailClassName()} style={getImageBackground()}>
                    { icon && <HeroIcon name="DocumentIcon" /> }
                    { video && 
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