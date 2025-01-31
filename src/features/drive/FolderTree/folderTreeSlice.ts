
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@app/createAppSlice"
import IFolder from "@features/types/folder.interface"
import { folderApi, useGetRootFoldersQuery } from "@/features/api/folderApi"
import { useLocation } from 'react-router-dom';

export interface FolderSliceState {
  folder: IFolder|null
}

const initialState: FolderSliceState = {
  folder: null
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
  extraReducers: builder => {
    builder.addMatcher(
      folderApi.endpoints.getRootFolders.matchFulfilled, 
      (state, { payload }) => {
        
        state.folder = payload
        
          // TODO: set correct folder state
          /*
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const folder= urlParams.get('folder')
        if(!folder) { 
          state.folder = payload; // Set folder state with fetched data
        } else { 
        }*/
        
      }
    );
  },

  selectors: {
    selectFolder: tree => tree.folder,
  },
})

export const { setFolder } =
folderTreeSlice.actions

export const { selectFolder } = folderTreeSlice.selectors
