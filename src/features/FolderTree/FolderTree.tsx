// components/FolderTree.tsx
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setId, selectId, setPath, setName } from './folderTreeSlice'
import { useGetRootFoldersQuery } from './folderTreeApiSlice'
import FolderTreeChild from "./FolderTreeChild"
import HeroIcon from '../../components/HeroIcon'
import { Scrollbars } from 'react-custom-scrollbars-2';

const FolderTree: React.FC = () => {
    const dispatch = useAppDispatch()
    const folderId = useAppSelector(selectId)
    const { data, isLoading, error } = useGetRootFoldersQuery()

    const handleHomeCLick = () => {
        dispatch(setId("root"))
        dispatch(setPath("Home"))
        dispatch(setName("Home"))
    }

    const handleActiveClass = () => {
        return folderId == "root" ? "active" : ""
    }

    if (!isLoading && data) {

        return (
            <div>
                <ul id="folder-tree">
                    <Scrollbars style={{ width: "98%", height: 300 }}>
                        <li><a className={handleActiveClass()} onClick={handleHomeCLick}><HeroIcon name="Folder" />Home</a></li>
                        {data.children && data.children.map(function (c) {
                            return (
                                // @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ 
                                <FolderTreeChild key={c.id + "_parent"} child={{
                                    // @ts-ignore (ノಠ益ಠ)ノ彡┻━┻  TODO: objectify
                                    id: c.id, name: c.name, path: c.path, children: c.children
                                }} />
                            )
                        })}
                    </Scrollbars>
                </ul>
            </div>
        )
    }
}

export default FolderTree