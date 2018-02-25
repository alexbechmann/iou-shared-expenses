import { Settlement } from './settlement';

export interface SettlementOverview {
  user: Parse.User;
  settlements: Settlement[];
}
