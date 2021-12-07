const api = 'https://sandbox-api.civicexplorer.com';
const track = 'cd5f22344c2ba0be1dd3964f898988c8';

export const environment = {
  apiURL: api,
  trackingNumber: track,
  enableTimers: true,
  production: false,
  mixpanel: true,
  auth: {
    domain: 'helm-sandbox.us.auth0.com',
    clientId: 'rU8r90TON0aOtpIj00GSQ0dUuT2fe5IP',
    audience: 'http://helmteam.us',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: [api + '/*'],
  },
  hmr: false
};
