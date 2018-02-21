
import { AuthState } from "src/auth";
import { ParseState } from "src/parse";
import { SocialState } from "src/social";
import { SettlementsState } from "src/settlements";

export interface AppState {
  auth: AuthState;
  parse: ParseState;
  social: SocialState;
  settlements: SettlementsState;
}
