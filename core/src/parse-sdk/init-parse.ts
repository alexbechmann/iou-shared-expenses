export const initParse = (parse: any, parseConfig: any) => {
  [Parse, parse].forEach(p => {
    p.initialize(parseConfig.applicationId, parseConfig.javaScriptKey);
    p.serverURL = parseConfig.serverUrl;
  })
};
