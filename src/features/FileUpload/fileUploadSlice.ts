import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@app/createAppSlice"
import UploadFileInterface from './UploadFileInterface'

export interface FileUploadSliceState {
  files: UploadFileInterface[],
  active: boolean
}

const initialState = {
  files: [],
  active: false
}

export const folderTreeSlice = createAppSlice({
  name: "folderTree",
  initialState,
  reducers: create => ({
    setFiles: create.reducer(
      (state, action: PayloadAction<UploadFileInterface[]>) => {
        state.files = action.payload
      },
    ),
    setActive: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.active = action.payload
      },
    ),
  }),

  selectors: {
    selectFiles: folders => folders.files,
    selectActive: folders => folders.active,
  },
})

export const { setFiles, setActive } =
  folderTreeSlice.actions

export const { selectFiles, selectActive } = folderTreeSlice.selectors


