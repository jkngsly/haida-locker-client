// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { setId } from './folderTreeSlice'
import { useAppDispatch } from "../../app/hooks"
import TreeChildInterface from './interfaces/TreeChildInterface'
import HeroIcon from '../../components/HeroIcon'

interface Props {
    child: TreeChildInterface
}

const FolderTreeChild: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch()

    const [active, setActive] = React.useState<boolean>(false)
    const child = props.child

    const handleCLick = () => {
        setActive(active ? false : true)
        dispatch(setId(child.id))
    }

    useEffect(() => {

    }, [active]) // TODO: subscribe to state instead

    return (
        <li key={child.id}>
            
            <a onClick={handleCLick}><HeroIcon name="FolderIcon" />{child.name}</a>
            {child.children && child.children.length > 0 && (
                <ul>
                    {active && child.children.map((c) => {
                        return (
                            <FolderTreeChild key={c.id + "_parent"} child={{
                                id: c.id,
                                name: c.name,
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
