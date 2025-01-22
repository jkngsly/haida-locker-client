// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId, setId, setPath, setName } from './folderTreeSlice'
import { useAppDispatch, useAppSelector } from "@app/hooks"
import Folder from '@features/interfaces/folder.interface'
import HeroIcon from '@components/HeroIcon'

interface Props {
    folder: Folder
}

const FolderTreeChild: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const folderId = useAppSelector(selectId)

    const [active, setActive] = React.useState<boolean>(false)
    const [expanded, setExpanded] = React.useState<boolean>(false)
    const folder = props.folder

    const handleClick = () => {

        if (expanded && active) {
            setExpanded(false)
        } else if (folder.children.length) {
            setExpanded(true)
        }

        dispatch(setId(folder.id))
        dispatch(setPath(folder.path))
        dispatch(setName(folder.name))
    }

    useEffect(() => {
        setActive(folderId == folder.id)
    }, [folderId]) // TODO: subscribe to state instead

    return (
        <li key={folder.id}>
            <a className={active ? "active" : ""} title={folder.name} onClick={handleClick}>
                <HeroIcon name={expanded ? "FolderOpen" : "Folder"} />{folder.name}</a>
            {folder.children && folder.children.length > 0 && (
                <ul>
                    {expanded && folder.children.map((child: Folder) => {
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
