import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { fileUploadSlice } from "@/features/drive/FileUpload/fileUploadSlice"

/* New */
import apiSlice from "@/features/api/apiSlice"
import { folderTreeSlice } from "@/features/drive/FolderTree/folderTreeSlice"
import { notificationsSlice } from "@/features/notifications/notificationsSlice"
import { authSlice } from "@/features/auth/authSlice"

const rootReducer = combineSlices(
  apiSlice,
  authSlice,
  folderTreeSlice,
  fileUploadSlice,
  notificationsSlice,
)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store
