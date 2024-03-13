import { createSlice } from "@reduxjs/toolkit";
// import { authApiSlice } from "./authApiSlice";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
};

// export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
//   try {
//     const response = await fetch(
//       `${process.env.REACT_APP_API_URL}/api/refresh`,
//       {
//         method: "GET",
//         credentials: "include",
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (e) {
//     console.log(e.response?.data?.message);
//     throw e;
//   }
// });

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(checkAuth.fulfilled, (state, action) => {
  //       const { user, accessToken } = action.payload;
  //       state.user = user;
  //       state.token = accessToken;
  //       localStorage.setItem("token", accessToken);
  //     })
  //     .addCase(checkAuth.rejected, (state) => {
  //       state.user = null;
  //       state.token = null;
  //       localStorage.removeItem("token");
  //     })
  //     // .addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state) => {
  //     //   state.user = null;
  //     //   state.token = null;
  //     //   localStorage.removeItem("token");
  //     // })
  //     .addDefaultCase(() => {});
  // },
});

const { reducer, actions } = authSlice;
export default reducer;

export const { setCredentials, setUser, logOut } = actions;
