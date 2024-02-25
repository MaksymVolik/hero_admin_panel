import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => "/heroes",
      transformResponse: (response) => response.data,
      providesTags: ["Heroes"],
    }),
    getFilters: builder.query({
      query: () => "/filters",
      transformResponse: (response) => response.data,
    }),
    createHero: builder.mutation({
      query: (hero) => ({
        url: `/heroes`,
        method: "POST",
        body: hero,
      }),
      invalidatesTags: ["Heroes"],
    }),
    updateHero: builder.mutation({
      query: ({ id, ...hero }) => ({
        url: `/heroes/${id}`,
        method: "PUT",
        body: hero,
      }),
      invalidatesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Heroes"],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useGetFiltersQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroesApi;
