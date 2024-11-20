import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth, githubProvider } from './firebase';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { User, AuthState } from './auth.types';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  error: null,
};

export const loginWithGithub = createAsyncThunk(
  'auth/loginWithGithub',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      if (!accessToken) throw new Error('Access token is missing.');
      localStorage.setItem('github_access_token', accessToken);

      const user = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      return {
        user,
        accessToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGithub.pending, (state) => {
        state.error = null;
      })
      .addCase(loginWithGithub.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginWithGithub.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
