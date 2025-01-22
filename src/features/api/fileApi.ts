import {
    createSelector,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'
import type { RootState } from '@app/store'
import { transformResponse, apiSlice } from '@features/api/apiSlice'
import File from '@features/interfaces/file.interface'

export const fileApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFile: builder.query<File, string>({
            query: (id) => 'file/' + id,
            transformResponse: (response: { data: File }, meta, arg) => response.data,
        }),
    }),
})

export const { useGetFileQuery } = fileApi
