import { apiSlice } from "../../api/apiSlice";

export const heroApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => "/heroes",
      transformResponse: (response) => response.data,
      // providesTags: ["Heroes"],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Heroes", id })),
              { type: "Heroes", id: "LIST" },
            ]
          : [{ type: "Heroes", id: "LIST" }],
    }),
    createHero: builder.mutation({
      query: (hero) => ({
        url: `/heroes`,
        method: "POST",
        body: hero,
      }),
      // invalidatesTags: ["Heroes"],
      invalidatesTags: [{ type: "Heroes", id: "LIST" }],
    }),
    // getHero: builder.query({
    //   query: (id) => `heroes/${id}`,
    //   transformResponse: (response) => response.data,
    //   providesTags: (result, error, id) => [{ type: "Heroes", id }],
    // }),
    updateHero: builder.mutation({
      query: ({ id, ...hero }) => ({
        url: `/heroes/${id}`,
        method: "PUT",
        body: hero,
      }),
      // invalidatesTags: ["Heroes"],
      // async onQueryStarted({ id, ...hero }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     heroApiSlice.util.updateQueryData("getHero", id, (draft) => {
      //       Object.assign(draft, hero);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //     // dispatch(heroApiSlice.util.invalidateTags(["Heroes"]));
      //   } catch {
      //     patchResult.undo();
      //   } finally {
      //     dispatch(heroActiveReset());
      //   }
      // },
      invalidatesTags: (result, error, { id }) => [{ type: "Heroes", id }],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Heroes"],
      invalidatesTags: (result, error, { id }) => [{ type: "Heroes", id }],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroApiSlice;
