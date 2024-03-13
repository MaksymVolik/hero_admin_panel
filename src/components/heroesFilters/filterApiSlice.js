import { apiSlice } from "../../api/apiSlice";

export const filterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilters: builder.query({
      query: () => "/filters",
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetFiltersQuery } = filterApiSlice;
