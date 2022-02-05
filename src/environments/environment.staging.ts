const api = 'https://staging.federation-service.organizer.helmahead.com';
const track = 'cd5f22344c2ba0be1dd3964f898988c8';

export const environment = {
  apiURL: api,
  trackingNumber: track,
  enableTimers: false,
  production: true,
  mixpanel: true,
  auth: {
    domain: 'helm-staging.us.auth0.com',
    clientId: 'BYjmdIqgpSnVrIZLSmldUCvPVdwZzGpD',
    audience: 'http://helmteam.us',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: [api + '/*'],
  },
  hmr: false
};
