import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationReducer from './notificationSlice';
import { baseApi } from './api/baseApi';
import './api/categoryApi';
import './api/productApi';
import './api/cartApi';
import './api/orderApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Extract the RootState type from the store itself
// TypeScript will now automatically know that state.auth holds your AuthState shape!
export type RootState = ReturnType<typeof store.getState>;

// Extract the AppDispatch type for typed dispatch hooks
export type AppDispatch = typeof store.dispatch;
