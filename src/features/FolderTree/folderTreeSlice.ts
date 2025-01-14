import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface FoldersSliceState {
  id: string
  //status: "idle" | "loading" | "failed"
}

const initialState: FoldersSliceState = {
    id: "root",
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
  }),

  selectors: {
    selectId: folders => folders.id,
  },
})

export const { setId } =
folderTreeSlice.actions

export const { selectId } = folderTreeSlice.selectors


