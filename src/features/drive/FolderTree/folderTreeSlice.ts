
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@app/createAppSlice"

export interface FolderSliceState {
  id: string
  path: string
  name: string
}

const initialState: FolderSliceState = {
  id: "root",
  path: "Home",
  name: "Home"
}

export const folderTreeSlice = createAppSlice({
  name: "folderTree",
  initialState,
  reducers: create => ({
    setId: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.id = action.payload
      },
    ),
    setPath: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.path = action.payload
      },
    ),
    setName: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.name = action.payload
      },
    ),
  }),

  selectors: {
    selectId: folders => folders.id,
    selectPath: folders => folders.path,
    selectName: folders => folders.name
  },
})

export const { setId, setPath, setName } =
folderTreeSlice.actions

export const { selectId, selectPath, selectName } = folderTreeSlice.selectors
