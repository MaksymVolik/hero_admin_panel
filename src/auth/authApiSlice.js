import { apiSlice } from "../api/apiSlice";
import { logOut } from "./authSlice";

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
    resendEmail: builder.mutation({
      query: () => ({
        url: "/resendemail",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useResendEmailMutation,
} = authApiSlice;
