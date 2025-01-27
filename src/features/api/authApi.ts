import { apiSlice } from '@features/api/apiSlice'
import IUser from '@/features/types/user.interface'
import { setUser } from '@/features/userSlice';
import { useAppDispatch } from '@/app/hooks';

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        verify: builder.query({
            query: () => 'auth/verify',
            transformResponse: (response: { data: IUser }, meta, arg) => response.data,
            providesTags: ['Auth'],      
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {}
            },
        }),

        login: builder.mutation<{ access_token: string, status: string }, any>({
            query(data) {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body: data,
                }
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
        }),

    }),
})

export const { useLoginMutation } = authApi