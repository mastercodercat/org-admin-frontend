import { Injectable } from '@angular/core';
import * as mixpanel from 'mixpanel-browser';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor() { }
  /**
   * Initialize mixpanel.
   *
   * @ param userToken
   * @ memberof MixpanelService
   */
  init(): void {
    // TODO add token
    let trackingNumber = environment.trackingNumber;

    if (environment.trackingNumber === '{PLACEHOLDER}') {
      switch (window.location.hostname) {
        case 'login.civicexplorer.com':
          trackingNumber = '84898ca8909d420056544b2d33ffdb0c';
          break;
        case 'staging-www.civicexplorer.com':
          trackingNumber = 'cd5f22344c2ba0be1dd3964f898988c8';
          break;
      }
    }
    mixpanel.init(trackingNumber);
  }

  /**
   * Push new Super Properties to mixpanel.
   *
   * @ param [items={}] Items object with custom properties that will be include with each event you send.
   * @ memberof MixpanelService
   */
  register(items: any = {}): void {
    mixpanel.register(items);
  }

  setPeople(items: any = {}): void {
    mixpanel.people.set(items);
  }

  /**
   * Identify a user with a unique ID to track user activity across devices, tie a user to their events, and create a user profile.
   *
   * @ param ['123'] String.
   * @ memberof MixpanelService
   */
  identify(id: string): void {
    mixpanel.identify(id);
  }

  /**
   * Push new action to mixpanel.
   *
   * @ param id Name of the action to track.
   * @ param [action={}] Actions object with custom properties.
   * @ memberof MixpanelService
   */
  track(id: string, action: any = {}): void {
    mixpanel.track(id, action);
  }
}
