export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  error: string | null;
}
