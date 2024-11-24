import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth, githubProvider } from './firebase';
import { User, AuthState } from './auth.types';

const initialState: AuthState = {
  user: null,
  error: null,
};

export const loginWithGithub = createAsyncThunk(
  'auth/loginWithGithub',
  async (_, { rejectWithValue }) => {
    try {
      const result: any = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      const githubToken = result._tokenResponse!;
      const rawUserData = JSON.parse(githubToken.rawUserInfo);

      if (!accessToken) throw new Error('Access token is missing.');

      const user = {
        accessToken,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        profileURL: rawUserData.html_url,
      };

      sessionStorage.setItem('userInfo', JSON.stringify(user));

      return {
        user,
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
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
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
      })
      .addCase(loginWithGithub.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
