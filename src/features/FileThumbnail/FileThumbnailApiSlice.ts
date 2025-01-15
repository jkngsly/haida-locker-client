// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import FileApiResponse from "./FtApiResponse.interface"

interface GetFileRequest { 
    folderId?: string
}

// Define a service using a base URL and expected endpoints
export const FileThumbnailApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        prepareHeaders(headers) {
            //headers.set('x-api-key', DOGS_API_KEY);
            return headers;
        },
    }),
    reducerPath: "fileThumbnailApi",
    tagTypes: ["fileThumbnailApi"],
    endpoints: build => ({
        getFile: build.query<FileApiResponse, string>({
            query: (id) => 'file/' + id,
            providesTags: ['fileThumbnailApi'], // This tag will cache the root folder list
        }),
    }),
})

export const { useGetFileQuery } = FileThumbnailApiSlice
