
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@app/createAppSlice"
import IFolder from "@features/types/folder.interface"

export interface FolderSliceState {
  folder: IFolder
}

const initialState: FolderSliceState = {
  folder: {
    id: 'root',
    name: 'Home',
    path: 'Home',
    parent_id: null,
    is_root: true,
    children: []
  }
}

export const folderTreeSlice = createAppSlice({
  name: "folderTree",
  initialState,
  reducers: create => ({
    setFolder: create.reducer(
      (state, action: PayloadAction<IFolder>) => {
        state.folder = action.payload
      },
    ),
  }),

  selectors: {
    selectFolder: tree => tree.folder,
  },
})

export const { setFolder } =
folderTreeSlice.actions

export const { selectFolder } = folderTreeSlice.selectors
