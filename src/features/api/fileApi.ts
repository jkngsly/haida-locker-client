import {
    createSelector,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import { transformResponse, apiSlice } from '@features/api/apiSlice'
import IFile from '@/features/types/file.interface'
import { searchForWorkspaceRoot } from 'vite'

export const fileApi = apiSlice.injectEndpoints({
    endpoints: build => ({
        getFile: build.query<IFile, string>({
            query: (id) => 'file/' + id,
            transformResponse: (response: { data: IFile }, meta, arg) => response.data,
        }),

        uploadFile: build.mutation({
            query: (formData) => ({
                url: '/file/upload', // Adjust this to your API endpoint
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Files'],
        }),

        deleteFile: build.mutation({
          query: (id) => ({
            url: `/file/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['Files'],
        }),

        search: build.query({
            query: (args) => ({
                url: '/file/search',
                method: 'POST',
                body: { 
                    name: args.search,
                    folderId: args.folderId
                },
            }),
            transformResponse: (response: { data: IFile[] }, meta, arg) => response.data,
            providesTags: ['Files']
        })
    })
})

export const { useGetFileQuery, useUploadFileMutation, useDeleteFileMutation, useSearchQuery } = fileApi
