import { User } from "parse";
import { Settlement } from "./settlement";

export interface SettlementOverview {
  user: User;
  settlements: Settlement[];
}