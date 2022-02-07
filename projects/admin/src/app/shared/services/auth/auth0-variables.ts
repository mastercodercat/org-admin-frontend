
import { environment as env } from '../../../../environments/environment';

interface AuthConfig {
  clientId: string;
  domain: string;
  audience: string;
  redirectUri: string;
  responseType: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientId: env.auth.clientId,
  domain: env.auth.domain,
  audience: env.auth.audience,
  redirectUri: env.auth.redirectUri,
  responseType: 'token',
};
