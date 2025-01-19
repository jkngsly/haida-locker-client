// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const fileUploadApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders(headers) {
      //headers.set('x-api-key', DOGS_API_KEY);
      return headers;
    },
  }),
  reducerPath: "folderTreeApi",
  tagTypes: ["folderTreeApi"],
  endpoints: build => ({
    getRootFolders: build.query<void, void>({
      query: () => 'folders',
      providesTags: ['folderTreeApi'], // This tag will cache the root folder list
    }),
  }),
})

export const { useGetRootFoldersQuery } = fileUploadApiSlice
