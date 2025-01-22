import {
    createSelector,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import { transformResponse, apiSlice } from '@features/api/apiSlice'
import File from '@features/interfaces/file.interface'

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
                headers: {
                    // Make sure to set the Content-Type to multipart/form-data (handled automatically by FormData)
                    // 'Content-Type': 'multipart/form-data',
                },
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


    })
})

export const { useGetFileQuery, useUploadFileMutation, useDeleteFileMutation } = fileApi
