import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MembersState } from '../../store/reducers/members.reducer';
import { Member } from './member.model';
import * as fromMembers from '../../store/selectors/members.selectors';
import { BaseComponent } from '../../../../../../../../src/app/core/base.component';

@Component({
  selector: 'org-admin-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent extends BaseComponent implements OnInit {
  members: Member[] = [];
  isLoading$: Observable<boolean> = this.store.pipe(select(fromMembers.selectIsLoading));

  constructor(private store: Store<MembersState>) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(select(fromMembers.selectMembers), takeUntil(this.ngUnsubscribe$))
      .subscribe(members => this.members = members);
  }

}
