import pkg from './../../package.json';

export const environment = {
  production: true,
  apiBaseUrl: 'https://yeah-time-tracking.flbk.dev/api/time-tracking',
  appVersion: pkg.version,
};