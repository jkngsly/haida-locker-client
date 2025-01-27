// store/slices/authSlice.ts

import { createAppSlice } from "@/app/createAppSlice";
import { authApi } from "@/features/api/authApi";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    usedToken: localStorage.getItem("token"),
};

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: create => ({
        setToken: create.reducer(
            (state, action: PayloadAction<string>) => {
                localStorage.setItem("token", action.payload)
                state.token = localStorage.getItem("token")
            },
        ),
    }),
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.access_token
                localStorage.setItem("token", payload.access_token)
            },
        )
    },
    /*authTokenChange: (state, action) => {
        console.log("change")
      localStorage.setItem("token", action.payload.accessToken);
      
      /*
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.usedToken = action.payload.accessToken;
     
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      state.token = null;
      state.refreshToken = null;
      state.usedToken = null;
    },
    adjustUsedToken: (state, action) => {
      state.usedToken = action.payload;
    },
  },

   */

});

export const { setToken } =
    authSlice.actions

export const { } = authSlice.selectors