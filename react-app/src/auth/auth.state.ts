export interface AuthState {
  currentUser?: Parse.User;
  loginError?: string;
  registerError?: string;
}
