import { apiSlice } from "../api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (user) => ({
        url: "/registration",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (error) {}
      },
    }),
    // refresh: builder.query({
    //   query() {
    //     return {
    //       url: "refresh",
    //     };
    //   },
    //   async onQueryStarted(_args, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       console.log("onQueryStarted: " + JSON.stringify(data));

    //       dispatch(setCredentials(data));
    //     } catch (error) {}
    //   },
    // }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
