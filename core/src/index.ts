import { UserHelper } from './users/user-helper';

export { Currency } from './models/currency';
export { Settlement } from './models/settlement';
export { CurrencyType } from './shared/currency-type';
export { TransactionType } from './shared/transaction-type';
export { UserProperties } from './users/user-properties';
export { nameof } from './shared/nameof';
export { Transaction } from './transactions/transaction';
export { FriendRequest } from './social/friend-request';

export * from './constants';

const userHelper = new UserHelper();

function initCoreParse(parseConfig: any) {
  Parse.initialize(parseConfig.applicationId, parseConfig.javaScriptKey);
  Parse.serverURL = parseConfig.serverUrl;
}

export { userHelper, initCoreParse };
