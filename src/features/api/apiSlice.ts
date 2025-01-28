import { setToken } from '@/features/auth/authSlice';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

export const transformResponse = (response: any) => {
  return {
    data: response.data || null,
    message: response.message || 'Request successful',
    statusCode: response.statusCode || 200,
    errors: response.errors || [],
  };
};

const baseQueryOpt = { 
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'same-origin',
}

const getHeaders = (headers: Headers, state: any, refreshToken: boolean) => { 
    const token = state.auth?.[refreshToken ? 'refreshToken' : 'token']
    headers.set('Authorization', `Bearer ${token}`)
    return headers
}

// @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ 
const baseQuery = fetchBaseQuery({
  ...baseQueryOpt,
  
  prepareHeaders: (headers, { getState }) => {
    return getHeaders(headers, getState() as any, false)
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  // Attempt API call
  let result = await baseQuery(args, api, extraOptions)
  // Catch invalid token (401)
  if (result.error && result.error.status === 401) {
    const release = await mutex.acquire()
    try {

      // Fetch new token 
      // @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ 
      const refreshResult = await fetchBaseQuery({
        ...baseQueryOpt,

        // Use headers with refresh token instead of access token
        prepareHeaders: (headers, { getState }) => {
          return getHeaders(headers, getState() as any, true)
        },
        // TODO: transform data response ex: data.data => data?
      })(
        'auth/refresh/',
        api,
        extraOptions)

      if (refreshResult.data) {
        // Set the new token
        // @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ 
        api.dispatch(setToken(refreshResult.data.data))
        // Retry the initial query
        result = await baseQuery(args, api, extraOptions)
      }
    } finally {
      // release must be called once the mutex should be released again.
      release()
    }
  }

  await mutex.waitForUnlock()
  return result;
}

export const apiSlice = createApi({
  reducerPath: 'api', // Shared reducer path for all slices
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Folders', 'Files', 'Users', 'Auth'], // Define tags for cache management
  endpoints: () => ({}), // Empty by default, extended in slices
});

export default apiSlice;