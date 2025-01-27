  import { apiSlice } from '@features/api/apiSlice'
  import User from '@features/interfaces/file.interface'
  
  export const authApi  = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getMe: builder.query({
        query: () => 'auth',
        transformResponse: (response: { data: User }, meta, arg) => response.data,
        providesTags: ['Auth'], 
      }),
    }),
  })
  
  export const { useGetMeQuery } = authApi