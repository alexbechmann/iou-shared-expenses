import { Transaction, initParse, FriendRequest } from '@iou/core';
import { createStandardAction } from 'typesafe-actions';

export const PARSE_INITIALIZED = 'IOU/PARSE_INITIALIZED';

export function initParseSDK() {
  const parseConfig = {
    applicationId: process.env.REACT_APP_PARSE_CONFIG_APP_ID as string,
    javaScriptKey: process.env.REACT_APP_PARSE_CONFIG_JAVASCRIPT_KEY as string,
    serverUrl: process.env.REACT_APP_PARSE_CONFIG_SERVER_URL as string
  };
  initParse(Parse, parseConfig);
  Parse.Object.registerSubclass('Transaction', Transaction);
  Parse.Object.registerSubclass('FriendRequest', FriendRequest);

  const facebookConfig = {
    appId: process.env.REACT_APP_FACEBOOK_CONFIG_APP_ID as string
  };
  Parse.FacebookUtils.init({
    // this line replaces FB.init({
    appId: facebookConfig.appId, // Facebook App ID
    status: false, // check Facebook Login status
    cookie: true, // enable cookies to allow Parse to access the session
    xfbml: true, // initialize Facebook social plugins on the page
    version: 'v2.3' // point to the latest Facebook Graph API version
  });

  return createStandardAction(PARSE_INITIALIZED);
}
