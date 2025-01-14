// components/FolderTree.tsx
import React, { useEffect, useState } from 'react';
import { setId } from './folderTreeSlice';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';

interface ChildInterface {
    id: string
    name: string
    children: ChildInterface[]
}

interface Props {
    child: ChildInterface
}

const TreeChild: React.FC<ChildInterface> = (props) => {
    const dispatch = useDispatch<AppDispatch>();

    const [active, setActive] = React.useState<boolean>(false)
    const child = props.child;

    const handleCLick = () => {
        setActive(active ? false : true)
        dispatch(setId(child.id))
    }

    useEffect(() => {

    }, [active])

    return (
        <li key={child.id}><a onClick={handleCLick}>{child.name}</a>
            {child.children && child.children.length > 0 && (
                <ul>
                    {active && child.children.map((c) => {
                        return (
                            <TreeChild key={c.id + "_parent"} child={{
                                id: c.id,
                                name: c.name,
                                children: c.children
                            }} />
                        )
                    })}
                </ul>
            )}

        </li>
    );
};

export default TreeChild;
