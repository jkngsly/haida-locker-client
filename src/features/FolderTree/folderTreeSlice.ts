import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface FoldersSliceState {
  id: string
  path: string
}

const initialState: FoldersSliceState = {
    id: "root",
    path: "Home"
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
  }),

  selectors: {
    selectId: folders => folders.id,
    selectPath: folders => folders.path
  },
})

export const { setId, setPath } =
folderTreeSlice.actions

export const { selectId, selectPath } = folderTreeSlice.selectors


