// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectFolder, setFolder } from './folderTreeSlice'
import { useAppDispatch, useAppSelector } from "@app/hooks"
import IFolder from '@/features/types/folder.interface'
import HeroIcon from '@components/HeroIcon'
import { useNavigate } from 'react-router-dom'

interface Props {
    folder: IFolder
}

const FolderTreeChild: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const selectedFolder = useAppSelector(selectFolder)
    const navigate = useNavigate()

    const [active, setActive] = React.useState<boolean>(false)
    const [expanded, setExpanded] = React.useState<boolean>(false)
    const folder = props.folder

    const handleClick = () => {

        if (expanded && active) {
            setExpanded(false)
        } else if (folder.children.length) {
            setExpanded(true)
        }

        dispatch(setFolder(folder))

        navigate("portal/folder?folder=" + folder.id)
    }

    useEffect(() => {
        setActive(selectedFolder.id == folder.id)
    }, [selectedFolder]) // TODO: subscribe to state instead

    return (
        <li key={folder.id}>
            <a className={active ? "active" : ""} title={folder.name} onClick={handleClick}>
                <HeroIcon name={expanded ? "FolderOpen" : "Folder"} />{folder.name}</a>
            {folder.children && folder.children.length > 0 && (
                <ul>
                    {expanded && folder.children.map((child: IFolder) => {
                        return (
                            <FolderTreeChild key={child.id + "_parent"} folder={child} />
                        )
                    })}
                </ul>
            )}

        </li>
    )
}

export default FolderTreeChild
