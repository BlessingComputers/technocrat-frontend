import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/api";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      // Get the token from the session cookie
      // Using the cookie name from your example, adjust if needed for this specific app
      const token = Cookies.get("blessing_session_token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Products",
    "Categories",
    "Cart",
    "Orders",
    "User",
    "SupportTickets",
  ],
  endpoints: () => ({}),
});
