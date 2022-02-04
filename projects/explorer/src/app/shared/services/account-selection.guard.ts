import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountSelectionGuard implements CanActivate {

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    // Already have a selected account
    // return this.currentUserService.getAccount().pipe(
    //   map((account: any) => {
    //     if (account) {
    //       return true;
    //     } else {
    //       return this.router.createUrlTree(['/explorer/accounts']);
    //     }
    //   }));
    // if (localStorage.getItem('selected_org')) {
    //   return true;
    // } else {
    //   return this.router.createUrlTree(['/explorer/accounts']);
    // }

    return this.currentUserService.getAccount().pipe(
      map((account: any) => {
        if (account) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      }));
  }
}
