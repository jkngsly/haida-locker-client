import { authSlice } from '@/features/auth/authSlice';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { useNavigate } from 'react-router-dom';

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

// @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ 
const baseQuery = fetchBaseQuery({
  ...baseQueryOpt,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth?.token
    headers.set('Authorization', `Bearer ${token}`)
    return headers
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

      console.log("SetItemRefresh")
      localStorage.setItem("refresh", "turd")

      // Fetch new token 
      // @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ 
      const refreshResult = await fetchBaseQuery({
        ...baseQueryOpt,
        prepareHeaders: (headers, { getState }) => {
          const token = (getState() as any).auth?.refreshToken
          headers.set('Authorization', `Bearer ${token}`)
          return headers
        }
      })(
        'auth/refresh',
        api,
        extraOptions)

      if (refreshResult.data) {
        
        // Retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        //const navigate = useNavigate()
        //navigate("/login")
      }
    } finally {
      // release must be called once the mutex should be released again.
      release()
    }
  } else {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    result = await baseQuery(args, api, extraOptions)
  }

  return result
}


export const apiSlice = createApi({
  reducerPath: 'api', // Shared reducer path for all slices
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Folders', 'Files', 'Users', 'Auth'], // Define tags for cache management
  endpoints: () => ({}), // Empty by default, extended in slices
});

export default apiSlice;