import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLogin: localStorage.getItem("islogin") === "true" ? true : false,
  token: localStorage.getItem("token"),
  isAdmin: localStorage.getItem("isadmin"),
  user_id: localStorage.getItem("user_id"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },

    logout(state) {
      state.isLogin = false;
    },

    admin(state, action) {
      let bool = action.payload.value;
      state.isAdmin = bool.toString();
    },

    setToken(state, action) {
      state.token = action.payload.value;
    },
  },
});
export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
