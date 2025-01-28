  import { apiSlice } from '@features/api/apiSlice'
  import IUser from '@/features/types/user.interface'
  
  export const userApi  = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getUsers: builder.query({
        query: () => 'users',
        transformResponse: (response: { data: IUser }, meta, arg) => response.data,
        providesTags: ['Users'], 
      }),
    }),
  })
  
  export const { useGetUsersQuery } = userApi
    