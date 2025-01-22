import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@app/createAppSlice"
import FileUploadInterface from './FileUploadInterface'

export interface FileUploadSliceState {
  files: FileUploadInterface[],
  active: boolean
}

const initialState = {
  files: [],
  active: false
}

export const fileUploadSlice = createAppSlice({
  name: "fileUpload",
  initialState,
  reducers: create => ({
    setUploadFiles: create.reducer(
      (state, action: PayloadAction<FileUploadInterface[]>) => {
        state.files = action.payload
      },
    ),
    setUploadActive: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.active = action.payload
      },
    ),
  }),

  selectors: {
    selectUploadFiles: fileUpload => fileUpload.files,
    selectUploadActive: fileUpload => fileUpload.active,
  },
})

export const { setUploadFiles, setUploadActive } =
fileUploadSlice.actions

export const { selectUploadFiles, selectUploadActive } = fileUploadSlice.selectors


