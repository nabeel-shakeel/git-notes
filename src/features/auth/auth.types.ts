export interface User {
  accessToken: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  profileURL: string | null;
}

export interface AuthState {
  user: User | null;
  error: string | null;
}
