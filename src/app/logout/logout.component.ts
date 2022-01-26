import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'org-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less'],
})
export class LogoutComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    console.log('init logout component');
  }

  /**
   * Call auth service to logout with auth0
   *
   * @memberof LogoutComponent
   */
  logout(): void {
    this.auth.logout();
  }
}
