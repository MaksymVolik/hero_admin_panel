import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
  const { request } = useHttp();
  return request(`${process.env.REACT_APP_API_URL}/heroes`);
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesAdd: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    },
    heroesDelete: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = heroesSlice;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (filter, heroes) => {
    if (filter === "all") {
      return heroes;
    } else {
      return heroes.filter((item) => item.element === filter);
    }
  }
);

export default reducer;
export const { heroesAdd, heroesDelete } = actions;
