import { UserType } from '@/types/UserType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: UserType | null;
  isAppLoading: boolean;
  token?: string | null;
};

const initialState: AuthState = {
  user: null,
  isAppLoading: true,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setAppLoading(state, action: PayloadAction<boolean>) {
      state.isAppLoading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, setAppLoading, logout } = authSlice.actions;

export default authSlice.reducer;
