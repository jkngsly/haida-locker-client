import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { FolderTreeApiSlice } from "@features/FolderTree/folderTreeApiSlice"
import { FolderTreeSlice } from "@/features/FolderTree/FolderTreeSlice"
import { FolderViewApiSlice } from "@features/FolderView/FolderViewApiSlice"
import { FileThumbnailApiSlice } from "@features/FileThumbnail/FileThumbnailApiSlice"
import { FileUploadSlice } from "@/features/FileUpload/FileUploadSlice"
import { FileUploadApiSlice } from "@features/FileUpload/FileUploadApiSlice"

const rootReducer = combineSlices(
  FolderTreeSlice,
  FolderTreeApiSlice, 
  FolderViewApiSlice,
  FileThumbnailApiSlice,
  FileUploadSlice,
  FileUploadApiSlice
)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
        .concat(FolderTreeApiSlice.middleware)
        .concat(FolderViewApiSlice.middleware)
        .concat(FileThumbnailApiSlice.middleware)
        .concat(FileUploadApiSlice.middleware)
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()
//setupListeners(store.dispatch)

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
