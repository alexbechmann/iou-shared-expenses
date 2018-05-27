import * as Parse from 'parse';
import { Action } from 'redux';
import { Transaction, FriendRequest } from 'src/shared/schema';
let parse = require('parse');

export const PARSE_INITIALIZED = 'IOU/PARSE_INITIALIZED';

export function initParseSDK(): Action {
  const parseConfig = {
    applicationId: process.env.REACT_APP_PARSE_CONFIG_APP_ID as string,
    javaScriptKey: process.env.REACT_APP_PARSE_CONFIG_JAVASCRIPT_KEY as string,
    serverUrl: process.env.REACT_APP_PARSE_CONFIG_SERVER_URL as string
  };
  const facebookConfig = {
    appId: process.env.REACT_APP_FACEBOOK_CONFIG_APP_ID as string
  };
  Parse.initialize(parseConfig.applicationId, parseConfig.javaScriptKey);
  parse.serverURL = parseConfig.serverUrl;

  Parse.Object.registerSubclass('Transaction', Transaction);
  Parse.Object.registerSubclass('FriendRequest', FriendRequest);

  Parse.FacebookUtils.init({
    // this line replaces FB.init({
    appId: facebookConfig.appId, // Facebook App ID
    status: true, // check Facebook Login status
    cookie: true, // enable cookies to allow Parse to access the session
    xfbml: true, // initialize Facebook social plugins on the page
    version: 'v2.3' // point to the latest Facebook Graph API version
  });

  return {
    type: PARSE_INITIALIZED
  };
}
