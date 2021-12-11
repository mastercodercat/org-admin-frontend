import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Organization } from '../shared/models/organization.model';
import { UserState } from '../store/reducers/user.reducer';
import * as fromUserSelectors from '../store/selectors/user.selectors';

@Component({
  selector: 'org-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {
  userInfo$: Observable<UserState>;
  currOrgInfo$: Observable<Organization | undefined>;

  constructor(private store: Store<UserState>) {
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
    this.currOrgInfo$ = this.store.pipe(select(fromUserSelectors.selectCurrentOrganization));
  }
}
