import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transformResponse = (response: any) => {
  return {
    data: response.data || null,
    message: response.message || 'Request successful',
    statusCode: response.statusCode || 200,
    errors: response.errors || [],
  };
};

export const apiSlice = createApi({
  reducerPath: 'api', // Shared reducer path for all slices
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token // Example: Adding auth token from state
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  tagTypes: ['Folders', 'Files'], // Define tags for cache management
  endpoints: () => ({}), // Empty by default, extended in slices
});

export default apiSlice;