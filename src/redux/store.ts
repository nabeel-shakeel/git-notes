import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/authSlice';
import { searchReducer } from '../features/search/searchSlice';
import { gistsApi } from '../features/gists/gistsApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [gistsApi.reducerPath]: gistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gistsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
