import { apiSlice } from "../api/apiSlice";
import { setUser } from "./authSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query() {
        return {
          url: "/me",
        };
      },
      transformResponse: (result) => result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetMeQuery } = userApiSlice;
