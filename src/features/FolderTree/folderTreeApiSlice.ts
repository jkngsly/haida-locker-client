// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import FolderApiResponse from "./interfaces/Folder.interface"

// Define a service using a base URL and expected endpoints
export const folderTreeApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders(headers) {
        //headers.set('x-api-key', DOGS_API_KEY);
        return headers;
    },
  }),
  reducerPath: "folderTreeApi",
  tagTypes: ["folderTreeApi"],
  endpoints: build => ({
      getRootFolders: build.query<FolderApiResponse, void>({
        query: () => 'folders',
        providesTags: ['folderTreeApi'], // This tag will cache the root folder list
      }),
  }),
})

export const { useGetRootFoldersQuery } = folderTreeApiSlice
