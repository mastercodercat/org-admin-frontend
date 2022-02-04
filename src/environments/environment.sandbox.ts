const api = 'https://api.sandbox.federation-service.organizer.helmahead.com';
const track = 'cd5f22344c2ba0be1dd3964f898988c8';

export const environment = {
  apiURL: api,
  trackingNumber: track,
  enableTimers: true,
  production: false,
  mixpanel: true,
  auth: {
    domain: 'helm-sandbox.us.auth0.com',
    clientId: 'D8ejI5YjzaVGaxlkSOvS4NR4P91kLpyi',
    audience: 'http://helmteam.us',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: [api + '/*'],
  },
  hmr: false
};
