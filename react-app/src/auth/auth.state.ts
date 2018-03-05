import { User } from 'parse';

export interface AuthState {
  currentUser?: User;
  loginError?: string;
  registerError?: string;
  registering: boolean;
  loggingIn: boolean;
}
