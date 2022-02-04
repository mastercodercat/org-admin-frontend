import { Injectable } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {AdminService} from './admin.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public audience: string = environment.auth.audience;
  private currentUser: any;
  private selectedAccount: any;
  private accounts?: any[];

  constructor(
    // private auth: AuthService,
  ) {
    if (environment.auth.audience === '{PLACEHOLDER}') {
      switch (window.location.hostname) {
      case 'login.civicexplorer.com':
        this.audience = 'http://helmteam.us';
        break;
      case 'staging-www.civicexplorer.com':
        this.audience = 'http://helmteam.us';
        break;
      }
    }
  }

  setUser(user: any): any {
    this.currentUser = user;
    this.accounts = user[this.audience + '/app_metadata']?.explorer?.accounts.filter((act: any) => !(act.blocked || act.isAccountDisabled));
    this.setAccounts();
    return this.currentUser;
  }

  setAccounts(): void {
    if (this.accounts?.length === 1) {
      this.selectAccount(this.accounts[0]);
    } else {
      // tslint:disable-next-line:radix
      const savedAccount = localStorage.getItem('explorer_account') || '';
      if (savedAccount) {
        this.selectAccount(this.accounts?.find(a => a.id === savedAccount));
      }
    }
  }

  getUser(): Observable<any> {
    if (this.currentUser) {
      return of(this.currentUser);
    }
    return of(this.currentUser);
    // return this.auth.user$.pipe(
    //   map((user: any) => {
    //     if (user) {
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //       return this.setUser(user);
    //     }
    //   }),
    // );
  }

  isSuperAdmin(): Observable<boolean> {
    if (this.currentUser) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return of(this.currentUser[this.audience + '/app_metadata']?.explorer?.admin);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.getUser().pipe(
      map(user => {
        if (user) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return user[this.audience + '/app_metadata']?.explorer?.admin;
        }
        return;
      }),
    );
  }

  getAccounts(): Observable<any> {
    if (this.accounts) {
      return of(this.accounts);
    }

    return this.getUser().pipe(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      map(() => this.accounts),
    );
  }

  selectAccount(account: any): void {
    this.selectedAccount = account;
    if (account && account.id) {
      localStorage.setItem('explorer_account', account.id);
    }
  }

  getAccount(): Observable<any> {
    const storage = localStorage.getItem('id_token');
    if (storage) {
      return of (true);
    } else {
      return of (false);
    }
  }

  destroy(): void {
    this.currentUser = undefined;
    this.selectedAccount = undefined;
    localStorage.removeItem('explorer_account');
  }

  clearAccountSelection(): void {
    this.selectedAccount = undefined;
    localStorage.removeItem('explorer_account');
  }
}
