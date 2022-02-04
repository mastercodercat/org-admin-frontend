const api = '{PLACEHOLDER}';
const track = '{PLACEHOLDER}';

export const environment = {
  apiURL: api,
  trackingNumber: track,
  enableTimers: false,
  production: true,
  mixpanel: false,
  auth: {
    domain: '{PLACEHOLDER}',
    clientId: '{PLACEHOLDER}',
    audience: 'http://helmteam.us',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: ['{PLACEHOLDER}'],
  },
  hmr: false
};
