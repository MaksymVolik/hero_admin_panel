import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL + "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  // console.log("result:" + JSON.stringify(result));

  if (result.error && result.error.status === 401) {
    // console.log("sending refresh token");
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // send refresh token to get new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        // console.log(refreshResult);
        if (refreshResult?.data) {
          // const user = api.getState().auth.user;
          // store the new token
          api.dispatch(setCredentials({ ...refreshResult.data }));
          //retry the original query with new access token
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({}),
});
