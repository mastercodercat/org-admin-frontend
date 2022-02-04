import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'organizer-frontends';
  showTrackingWarning = true;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.showTrackingWarning = !localStorage.getItem('trackingAccepted');
  }

  acceptTracking(): void {
    localStorage.setItem('trackingAccepted', 'true');
    this.showTrackingWarning = false;
  }
}
