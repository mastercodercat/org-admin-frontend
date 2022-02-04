import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {last, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export interface AccountResponse {
  id: string;
  name: string;
  segment: string[];
  isDisabled: boolean;
}

export interface UserResponse {
  user_id: string;
  email: string;
  phone_number: number;
  first_name: string;
  last_name: string;
  email_verified: boolean;
  accounts: any;
  is_super_admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl: string = environment.apiURL;

  constructor(private http: HttpClient) {
    if (environment.apiURL === '{PLACEHOLDER}') {
      switch (window.location.hostname) {
        case 'login.civicexplorer.com':
          this.apiUrl = 'https://api.civicexplorer.com';
          break;
        case 'staging-www.civicexplorer.com':
          this.apiUrl = 'https://staging-api.civicexplorer.com';
          break;
        case 'sandbox-www.civicexplorer.com':
          this.apiUrl = 'https://sandbox-api.civicexplorer.com';
          break;
      }
    }
  }

  getAccounts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/explorer/account/all')
    .pipe(map(res => {
      return res.data.map((data: AccountResponse) => this.transformAccountData(data));
    }));
  }

  createAccount(name: string, segment: string[]): Observable<any> {
    const body = { name, segment };
    return this.http.post<any>(this.apiUrl + '/explorer/account/create', body)
    .pipe(map(res => {
      return res.data.map((data: AccountResponse) => this.transformAccountData(data));
    }));
  }

  disableAccount(accountId: string, isDisabled: boolean): Observable<any> {
    const body = {id: accountId, isDisabled};
    return this.http.post<any>(this.apiUrl + '/explorer/account/disable', body)
    .pipe(map(res => {
      return res.data.map((data: AccountResponse) => this.transformAccountData(data));
    }));
  }

  transformAccountData(accountData: any): any {
    return {
      id: accountData.id,
      name: accountData.name,
      segment: accountData.segment,
      isDisabled: accountData.isDisabled
    };
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/explorer/user/all')
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  updateUser(userId: string, firstName: string, lastName: string): Observable<any> {
    const body = {user_id: userId,  first_name: firstName, last_name: lastName};
    return this.http.post<any>(this.apiUrl + '/explorer/user/update', body)
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  inviteUser(email: string, accountId: string, firstName: string, lastName: string, isSuperAdmin: boolean): Observable<any> {
    const body = { email, account_id: accountId, is_super_admin: isSuperAdmin, first_name: firstName, last_name: lastName};
    return this.http.post<any>(this.apiUrl + '/explorer/user/invite', body)
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  resendInviteToUser(email: string, userId: string, accountId: string): Observable<any> {
    const body = { email, user_id: userId, account_id: accountId};
    return this.http.post<any>(this.apiUrl + '/explorer/user/invite', body);
  }

  assignSuperAdminToUser(userId: string, isSuperAdmin: boolean): Observable<any> {
    const body = { user_id: userId, is_super_admin: isSuperAdmin};
    return this.http.post<any>(this.apiUrl + '/explorer/user/make_super_admin', body)
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  addUserToAccount(userId: string, accountId: string): Observable<any> {
    const body = { user_id: userId, account_id: accountId };
    return this.http.post<any>(this.apiUrl + '/explorer/user/add_to_account', body)
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  removeUserFromAccount(userId: string, accountId: string): Observable<any> {
    const body = { user_id: userId, account_id: accountId };
    return this.http.post<any>(this.apiUrl + '/explorer/user/remove_from_account', body)
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  blockUserFromAccount(userId: string, accountId: string, shouldBlock: boolean): Observable<any> {
    const body = {
      user_id: userId,
      account_id: accountId,
      blocked: shouldBlock
    };
    return this.http.post<any>(this.apiUrl + '/explorer/user/block_from_account', body)
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  resetPassword(userId: string, email: string): Observable<any> {
    const body = { email, user_id: userId};
    return this.http.post<any>(this.apiUrl + '/explorer/user/reset_password', body)
    .pipe(map(res => {
      return res.data.map((data: UserResponse) => this.transformUserData(data));
    }));
  }

  transformUserData(userData: any): any {
    return {
      userId: userData.user_id,
      avatar: userData.avatar,
      email: userData.email,
      emailVerified: userData.email_verified,
      phoneNumber: userData.phone_number,
      firstName: userData.first_name,
      lastName: userData.last_name,
      userAccounts: userData.accounts,
      superAdmin: userData.is_super_admin,
    };
  }
}
