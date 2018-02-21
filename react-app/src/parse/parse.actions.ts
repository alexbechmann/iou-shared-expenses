import * as Parse from 'parse';
import { Action } from "redux";
import { FriendRequest, Transaction } from '@iou/core';
let parse = require('parse');

export const PARSE_INITIALIZED = "IOU/PARSE_INITIALIZED";

export function initParseSDK(): Action {
  const payload = new Promise<any>((resolve, reject) => {
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

    // Parse.User.allowCustomUserClass(true);
    // Parse.User.registerSubclass("_User", User)
    window["fbAsyncInit"] = () => {
      Parse.FacebookUtils.init({ // this line replaces FB.init({
        appId: facebookConfig.appId, // Facebook App ID
        status: true,  // check Facebook Login status
        cookie: true,  // enable cookies to allow Parse to access the session
        xfbml: true,  // initialize Facebook social plugins on the page
        version: 'v2.3' // point to the latest Facebook Graph API version
      });

      // Run code after the Facebook SDK is loaded.
      resolve();
    };

    (function (d: any, s: any, id: any) {
      var js: any, fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });

  return {
    type: PARSE_INITIALIZED,
    payload: payload
  } as Action;
}
