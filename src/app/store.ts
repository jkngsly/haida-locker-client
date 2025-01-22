import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { FileUploadSlice } from "@/features/FileUpload/FileUploadSlice"

/* New */
import apiSlice from "@/features/api/apiSlice"
import { folderTreeSlice } from "@/features/FolderTree/folderTreeSlice"

const rootReducer = combineSlices(
  folderTreeSlice,
  FileUploadSlice,
  apiSlice
)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the base API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store
