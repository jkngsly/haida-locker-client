import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { folderTreeApiSlice } from "@features/FolderTree/folderTreeApiSlice"
import { folderTreeSlice } from "@features/FolderTree/folderTreeSlice"
import { folderViewApiSlice } from "@features/FolderView/FolderViewApiSlice"
import { FileThumbnailApiSlice } from "@features/FileThumbnail/FileThumbnailApiSlice"

const rootReducer = combineSlices(
  folderTreeApiSlice, 
  folderTreeSlice,
  folderViewApiSlice,
  FileThumbnailApiSlice
)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
        .concat(folderTreeApiSlice.middleware)
        .concat(folderViewApiSlice.middleware)
        .concat(FileThumbnailApiSlice.middleware)
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
