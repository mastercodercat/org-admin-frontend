const api = 'https://api.civicexplorer.com';
const track = '84898ca8909d420056544b2d33ffdb0c';

export const environment = {
  apiURL: api,
  trackingNumber: track,
  enableTimers: false,
  production: true,
  mixpanel: false,
  auth: {
    domain: 'helm-prod.us.auth0.com',
    clientId: 'rMOk6HWMNk51ZFWIW5pn43iunnL6yyto',
    audience: 'http://helmteam.us',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: [api + '/*'],
  },
  hmr: false,
};
