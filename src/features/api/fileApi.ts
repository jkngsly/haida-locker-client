import {
    createSelector,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import { transformResponse, apiSlice } from '@features/api/apiSlice'
import File from '@features/interfaces/file.interface'
import { searchForWorkspaceRoot } from 'vite'

export const fileApi = apiSlice.injectEndpoints({
    endpoints: build => ({
        getFile: build.query<File, string>({
            query: (id) => 'file/' + id,
            transformResponse: (response: { data: File }, meta, arg) => response.data,
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
            query: (search) => ({
                url: '/file/search',
                method: 'POST',
                body: { 
                    name: search.text
                },
            }),
            transformResponse: (response: { data: File[] }, meta, arg) => response.data,
            providesTags: ['Files']
        })
    })
})

export const { useGetFileQuery, useUploadFileMutation, useDeleteFileMutation, useSearchQuery } = fileApi
