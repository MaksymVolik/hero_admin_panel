import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeHero: {
    id: 0,
    name: "",
    description: "",
    element: "",
  },
  activeFilter: "all",
};

const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    filtersSetActive: (state, action) => {
      state.activeFilter = action.payload;
    },
    heroSetActive: (state, action) => {
      state.activeHero = action.payload;
    },
    heroActiveReset: (state, action) => {
      state.activeHero = initialState.activeHero;
    },
  },
});

const { reducer, actions } = activeSlice;

export default reducer;
export const { filtersSetActive, heroSetActive, heroActiveReset } = actions;
