import { apiSlice } from '@features/api/apiSlice'
import { setUser } from '@/features/userSlice';
import IUser from '@/features/types/user.interface'
import ITokenResponse from '@/features/types/token.interface';

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<ITokenResponse, any>({
            query(data) {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body: data,
                }
            },
            transformResponse: (response: { data: ITokenResponse }, meta, arg) => response.data,
        }),

        refresh: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken },
            }),
        }),

        verify: builder.query({
            query: () => 'auth/verify',
            transformResponse: (response: { data: IUser }, meta, arg) => response.data,
            providesTags: ['Auth'],
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) { }
            },
        }),

    }),
})

export const { useLoginMutation } = authApi