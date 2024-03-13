import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import active from "../slices/activeSlice";
import authReducer from "../auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    active,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
