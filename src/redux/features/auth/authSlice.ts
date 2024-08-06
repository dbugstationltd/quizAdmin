import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TAuth = {
  user: {
    id: number;
    name: string;
    email: string;
    photo: string | null;
    adminType: { id: number; title: string };
  } | null;
  token: string | null;
};

const initialState: TAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<TAuth>) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
