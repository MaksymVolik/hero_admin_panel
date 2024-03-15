import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      localStorage.setItem("token", accessToken);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
});

const { reducer, actions } = authSlice;
export default reducer;

export const { setCredentials, setUser, logOut } = actions;
