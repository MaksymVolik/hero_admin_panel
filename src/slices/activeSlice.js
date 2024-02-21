import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeHero: "",
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
  },
});

const { reducer, actions } = activeSlice;

export default reducer;
export const { filtersSetActive, heroSetActive } = actions;
