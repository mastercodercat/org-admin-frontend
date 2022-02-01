import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(): Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
