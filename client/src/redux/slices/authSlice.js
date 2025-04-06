import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";

const initialState = {
  username: null,
  usertoken: null,
  membertoken: null,
  role: "user",
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body: body,
      }),
      transformErrorResponse: (err) => ({
        status: err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body: body,
      }),
      transformErrorResponse: (err) => ({
        status: err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.role = "user";
      state.username = null;
      state.usertoken = null;
      state.membertoken = null;
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("usertoken");
      localStorage.removeItem("membertoken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApiSlice.endpoints.login.matchRejected)
      .addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
        localStorage.setItem("username", payload.username);
        localStorage.setItem("role", payload.role);
        if (payload.role === "member") {
          state.role = "member";
          state.membertoken = payload.token;
          localStorage.setItem("membertoken", payload.token);
        } else {
          localStorage.setItem("usertoken", payload.token);
          state.usertoken = payload.token;
        }
        state.username = payload.username;
      })
      .addMatcher(authApiSlice.endpoints.register.matchRejected)
      .addMatcher(authApiSlice.endpoints.register.matchFulfilled, (state, { payload }) => {
        localStorage.setItem("username", payload.username);
        localStorage.setItem("role", payload.role);
        if (payload.role === "member") {
          state.role = "member";
          state.membertoken = payload.token;
          localStorage.setItem("membertoken", payload.token);
        } else {
          state.role = "user";
          localStorage.setItem("usertoken", payload.token);
          state.usertoken = payload.token;
        }
        state.username = payload.username;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const authSliceData = (state) => state.auth;
