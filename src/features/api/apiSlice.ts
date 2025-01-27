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


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as any).auth?.token 

    console.log("VERIFY TOKEN")

    if (!token) {
        token = (getState() as any).auth?.refreshToken 
    }
    
    headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
  credentials: 'same-origin',
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

      if(localStorage.getItem("refreshToken")) { 
        
      }

      // Fetch new token 
      const refreshResult = await baseQuery(
        'auth/refresh',
        api,
        extraOptions
      )

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