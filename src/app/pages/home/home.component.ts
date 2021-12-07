import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { UserState } from 'src/app/store/reducers/user.reducer';
import * as fromUserSelectors from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'org-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  userInfo$!: Observable<UserState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Store user info in observable variable to use in html template
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
  }
}
