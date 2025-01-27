import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, RootState } from "@reduxjs/toolkit/query";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  const authState = (store.getState() as RootState).auth;

  if (result.error && result.error.status === 401) {
    if (!authState.token || !authState.refreshToken) return result;

    // Update token to use refresh token
    store.dispatch(adjustUsedToken(authState.refreshToken as string));

    // Try to refresh the token
    const refreshResult = await baseQuery("/refresh-token", store, extraOptions);

    if (refreshResult.data) {
      // Store the new tokens
      store.dispatch(
        authTokenChange({
          accessToken: (refreshResult.data as any).accessToken,
          refreshToken: authState.refreshToken as string,
        })
      );
      // Retry the original request
      result = await baseQuery(args, store, extraOptions);
    } else {
      //store.dispatch(logoutUser());
    }
  }
  return result;
};
function baseQuery(args: string | FetchArgs, store: BaseQueryApi, extraOptions: {}) {
    throw new Error("Function not implemented.");
}

function adjustUsedToken(arg0: string): any {
    throw new Error("Function not implemented.");
}

function authTokenChange(arg0: { accessToken: any; refreshToken: string; }): any {
    throw new Error("Function not implemented.");
}

