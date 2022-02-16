import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../../../../src/app/shared/services/user/user.service';

interface Tab {
  route: string;
  name: string;
  icon: string;
  showTab: Observable<boolean>;
}

@Component({
  selector: 'org-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  tabs: Tab[] = [
    {
      route: '/dashboard/members',
      name: 'Members',
      icon: 'user',
      showTab: this.userService.isAdminOrUser$(),
    },
    {
      route: '/dashboard/accounts',
      name: 'Accounts',
      icon: 'apartment',
      showTab: this.userService.isAdminOrUser$(),
    },
    {
      route: '/dashboard/landing-page-domains',
      name: 'Landing Page Domains',
      icon: 'smile',
      showTab: this.userService.isAdminOrUser$(),
    },
    /*
    {
      route: '/dashboard/activity',
      name: 'Activity',
      icon: 'line-chart',
    },
    {
      route: '/dashboard/billing',
      name: 'Billing',
      icon: 'dollar',
    },
    {
      route: '/dashboard/permissions',
      name: 'Permissions',
      icon: 'lock',
    },
    */
  ];

  activeTab = 0;

  constructor(private router: Router, private userService: UserService) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(): boolean {
      return false;
    };

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        const url = evt.url;
        this.activeTab = this.tabs.findIndex((tab: Tab) => tab.route === url);

        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }
}
