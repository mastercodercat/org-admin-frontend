import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'org-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {

  constructor(public auth: AuthService) { }

  /**
   * Call auth service to logout with auth0
   *
   * @memberof LogoutComponent
   */
  logout(): void {
    this.auth.logout();
  }
}
