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
    createHero: builder.mutation({
      query: (hero) => ({
        url: `/heroes`,
        method: "POST",
        body: hero,
      }),
      invalidatesTags: ["Heroes"],
    }),
    // updateHeroes: builder.mutation({
    //     query: heroes => ({
    //         url: `/heroes`,
    //         method: 'PUT',
    //         body: heroes,
    //     }),
    //     invalidatesTags: ['Heroes'],
    // }),
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
  useCreateHeroMutation,
  // useUpdateHeroesMutaion,
  useDeleteHeroMutation,
} = heroesApi;