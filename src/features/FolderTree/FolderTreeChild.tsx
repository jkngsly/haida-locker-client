// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { selectId, setId, setPath, setName } from './folderTreeSlice'
import { useAppDispatch, useAppSelector } from "@app/hooks"
import Folder from '@features/interfaces/folder.interface'
import HeroIcon from '@components/HeroIcon'

interface Props {
    child: Folder
}

const FolderTreeChild: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const folderId = useAppSelector(selectId)

    const [active, setActive] = React.useState<boolean>(false)
    const [expanded, setExpanded] = React.useState<boolean>(false)
    const child = props.child

    const handleCLick = () => {

        if (expanded && active) {
            setExpanded(false)
        } else if (child.children.length) {
            setExpanded(true)
        }

        dispatch(setId(child.id))
        dispatch(setPath(child.path))
        dispatch(setName(child.name))
    }

    useEffect(() => {
        setActive(folderId == child.id)
    }, [folderId]) // TODO: subscribe to state instead

    return (
        <li key={child.id}>
            <a className={active ? "active" : ""} title={child.name} onClick={handleCLick}>
                <HeroIcon name={expanded ? "FolderOpen" : "Folder"} />{child.name}</a>
            {child.children && child.children.length > 0 && (
                <ul>
                    {expanded && child.children.map((c) => {
                        return (
                            <FolderTreeChild key={c.id + "_parent"} child={{
                                id: c.id,
                                name: c.name,
                                path: c.path,
                                children: c.children
                            }} />
                        )
                    })}
                </ul>
            )}

        </li>
    )
}

export default FolderTreeChild
