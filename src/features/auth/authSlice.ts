// store/slices/authSlice.ts

import { createAppSlice } from "@/app/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import ITokenResponse from '@/features/types/token.interface';

const initialState = {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    sub: localStorage.getItem("sub")
};

const setLocalStorage = (res: ITokenResponse) => { 
    localStorage.setItem("token", res.accessToken)
    localStorage.setItem("refreshToken", res.refreshToken)
    localStorage.setItem("sub", res.sub)
}

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: create => ({
        setToken: create.reducer(
            (state, action: PayloadAction<ITokenResponse>) => {
                localStorage.setItem("token", action.payload.accessToken)
                localStorage.setItem("refreshToken", action.payload.refreshToken)
                localStorage.setItem("sub", action.payload.sub)

                state.token = localStorage.getItem("token")
                state.refreshToken = localStorage.getItem("refreshToken")
                state.sub = localStorage.getItem("sub")
            },
        ),

        refresh: create.reducer(
            (state) => {
                state.token = null
            },
        ),
    }),
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