// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import FolderApiResponse from "./interfaces/Folder.interface"

interface GetFilesRequest { 
    folderId?: string
}

// Define a service using a base URL and expected endpoints
export const folderViewApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        prepareHeaders(headers) {
            //headers.set('x-api-key', DOGS_API_KEY)
            return headers
        },
    }),
    reducerPath: "folderViewApi",
    tagTypes: ["folderViewApi"],
    endpoints: build => ({
        getFiles: build.query<FolderApiResponse[], { folderId: string }>({
            query: ({ folderId }) => 'folders/' + folderId + '/files',
            providesTags: (result, error, { folderId }) => [
                { type: 'folderViewApi', id: folderId }, // Unique tag for each parentId
            ],
        }),
    }),
})

export const { useGetFilesQuery } = folderViewApiSlice
