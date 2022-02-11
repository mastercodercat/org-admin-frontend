import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Organization } from '../../projects/admin/src/app/shared/models/organization.model';
import { UserState } from './store/reducers/user.reducer';
import * as fromUserSelectors from './store/selectors/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userInfo$: Observable<UserState>;
  currOrgInfo$: Observable<Organization | undefined>;

  title = 'organizer-frontends';
  showTrackingWarning = true;

  constructor(public router: Router, private store: Store<UserState>) {
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
    this.currOrgInfo$ = this.store.pipe(select(fromUserSelectors.selectCurrentOrganization));
  }

  ngOnInit(): void {
    this.showTrackingWarning = !localStorage.getItem('trackingAccepted');
  }

  acceptTracking(): void {
    localStorage.setItem('trackingAccepted', 'true');
    this.showTrackingWarning = false;
  }
}
