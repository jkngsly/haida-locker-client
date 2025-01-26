  import { apiSlice } from '@features/api/apiSlice'
  import User from '@features/interfaces/file.interface'
  
  export const userApi  = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getUsers: builder.query({
        query: () => 'users',
        transformResponse: (response: { data: User }, meta, arg) => response.data,
        providesTags: ['Users'], 
      }),
    }),
  })
  
  export const { useGetUsersQuery } = userApi
    