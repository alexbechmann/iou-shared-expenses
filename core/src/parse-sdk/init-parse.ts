export const initParse = (parse: any, parseConfig: any) => {
  parse.initialize(parseConfig.applicationId, parseConfig.javaScriptKey);
  parse.serverURL = parseConfig.serverUrl;

  Parse.initialize(parseConfig.applicationId, parseConfig.javaScriptKey);
  Parse.serverURL = parseConfig.serverUrl;
};
