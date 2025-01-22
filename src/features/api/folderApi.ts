import {
  createSelector,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import {transformResponse, apiSlice } from '@features/api/apiSlice'
import Folder from '@features/interfaces/folder.interface'
import File from '@features/interfaces/file.interface'

const foldersAdapter = createEntityAdapter<Folder>()
const initialState = foldersAdapter.getInitialState()

export const folderApi  = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRootFolders: builder.query({
      query: () => 'folders',
      transformResponse: (response: { data: Folder[] }, meta, arg) => response.data,
     /* transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response.status,*/

      providesTags: ['Folders'], 
    }),

    getFiles: builder.query({
        query: ({ folderId }) => 'folders/' + folderId + '/files',
        transformResponse: (response: { data: File[] }, meta, arg) => response.data,
        providesTags: ['Files'], 
    }),
  }),
})

export const { useGetRootFoldersQuery, useGetFilesQuery } = folderApi

/*
TODO: camelCase output 
"id": "bfb82bfe-13f5-4d98-bc30-a9d24b74b2af",
		"created_at": "2025-01-13T00:44:17.420Z",
		"updated_at": "2025-01-13T00:44:17.420Z",
		"deleted_at": null,
		"drive_id": "c44ec9ac-09aa-4cca-b26c-f9ac3a2d741f",
		"parent_id": null,
		"name": "root",
		"path": "",
		"level": 0,
		"is_root": true,
		"children": [
			{
}


TODO: revisit
// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()
export const selectUsersResult = apiSliceWithUsers.endpoints.getUsers.select()
const selectUsersData = createSelector(
  selectUsersResult,
  // Fall back to the empty entity state if no response yet.
  result => result.data ?? initialState
)


export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (currentUsername) {
    return selectUserById(state, currentUsername)
  }
}

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(selectUsersData)
*/

