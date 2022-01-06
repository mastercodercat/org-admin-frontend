import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth0 from 'auth0-js';
import * as fromActions from '../../../login/store/actions/login.actions';
import { AppState } from '../../../store/reducers';
import { AUTH_CONFIG } from './auth0-variables';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientId,
    domain: AUTH_CONFIG.domain,
    redirectUri: AUTH_CONFIG.redirectUri,
    responseType: AUTH_CONFIG.responseType,
  });

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private store: Store<AppState>,
  ) { }

  /**
   * Used to call the oauth/login endpoint with credentials and callback options to handle error and successful login
   *
   * @param {string} email
   * @param {string} password
   * @memberof AuthService
   */
  login(email: string, password: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.auth0.client.login({
        realm: 'Username-Password-Authentication',
        username: email,
        password,
      },
      (err: auth0.Auth0Error | null, authResult: auth0.Auth0Result) => {
        if (err) {
          // Dispatch loginFailure action and save error response to the store
          this.store.dispatch(fromActions.loginFailure({
            error: {
              code: err.code,
              description: err.description,
              statusCode: err.statusCode,
            },
          }));

          return reject({
            error: {
              code: err.code,
              description: err.description,
              statusCode: err.statusCode,
            },
          });

        } else if (authResult) {
          this.setSession(authResult);
          // Dispatch login success so we can act on it
          this.store.dispatch(fromActions.loginSuccess());

          return resolve(true);
        }

        return reject(false);
      });
    });
  }

  /**
   * Set the access_token, id_token, and when token expires in the localstorage
   *
   * @param {auth0.Auth0Result} authResult
   * @memberof AuthService
   */
  setSession(authResult: auth0.Auth0Result): void {
    if (authResult.expiresIn && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      // Set results in local storage for usage later
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
  }

  /**
   * Check if user has been authenticated and direct them to login page if not
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  isAuthenticated(): boolean {
    // Make sure token exists
    const tokenExpiry = localStorage.getItem('expires_at');
    if (tokenExpiry) {
      // Check whether the current time is past the expires_at time saved in local storage
      const expiresAt: number = JSON.parse(tokenExpiry) as number;
      return new Date().getTime() < expiresAt;
    }
    return false;
  }

  /**
   * Log the user out and clear the localstorage
   *
   * @memberof AuthService
   */
  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.auth0.logout({ clientID: AUTH_CONFIG.clientId, returnTo: `${this.doc.location.origin}/login` });
  }
}
