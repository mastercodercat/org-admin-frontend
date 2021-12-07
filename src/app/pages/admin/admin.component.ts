import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'org-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent {
  tabs = [
    {
      route: '/dashboard/members',
      name: 'Members',
      icon: 'user',
    },
    {
      route: '/dashboard/accounts',
      name: 'Accounts',
      icon: 'apartment',
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

  constructor(private router: Router) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        const url = evt.url;
        this.activeTab = this.tabs.findIndex((tab) => tab.route === url);

        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }
}