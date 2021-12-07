import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/reducers';
import { UserState } from '../store/reducers/user.reducer';
import * as fromUserSelectors from '../store/selectors/user.selectors';

@Component({
  selector: 'org-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent implements OnInit {
  userInfo$!: Observable<UserState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
  }
}
