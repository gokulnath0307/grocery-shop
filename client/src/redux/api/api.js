import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const role = localStorage.getItem("role");
    const userToken = localStorage.getItem("usertoken");
    const memberToken = localStorage.getItem("membertoken");

    if (role === "member" && memberToken) {
      headers.set("Authorization", `Bearer ${memberToken}`);
    } else if (userToken) {
      headers.set("Authorization", `Bearer ${userToken}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "artgalleryapi",
  baseQuery,
  tagTypes: ["memberproduct","cart"],
  endpoints: () => ({}),
});
