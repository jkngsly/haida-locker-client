// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const FileUploadApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders(headers) {
      //headers.set('x-api-key', DOGS_API_KEY);
      return headers;
    },
  }),
  reducerPath: "folderUploadApi",
  tagTypes: ["folderUploadApi"],
  endpoints: build => ({
    upload: build.mutation({
        query: (formData) => ({
          url: '/file/upload', // Adjust this to your API endpoint
          method: 'POST',
          body: formData,
          headers: {
            // Make sure to set the Content-Type to multipart/form-data (handled automatically by FormData)
           // 'Content-Type': 'multipart/form-data',
          },
        }),
    }),
  }),    
})

export const { useUploadMutation } = FileUploadApiSlice
