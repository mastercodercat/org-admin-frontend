import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardMaintenance implements CanActivate {
  turnMaintenanceOn = false;

  constructor(
      private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.turnMaintenanceOn) {
      this.router.navigate(['/maintenance']).then();
      return false;
    } else {
      return true;
    }
  }

}
