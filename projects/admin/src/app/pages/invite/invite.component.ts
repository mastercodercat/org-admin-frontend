import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take, mergeMap } from 'rxjs/operators';
import { FindRolesGQL, SendInvitationGQL } from '../../shared/services/graphql/graphql.service';
import * as fromUserSelectors from '../../store/selectors/user.selectors';
import { UserState } from '../../store/reducers/user.reducer';
import { Role } from '../../shared/models/role.model';

export interface Invite {
  email: string;
  role: Role;
}

@Component({
  selector: 'org-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  step = 0;
  roles: Role[] = [];
  isLoading = true;

  emails: string[] = [];
  constructor(private findRolesService: FindRolesGQL,
              private sendInvitationService: SendInvitationGQL,
              private store: Store<UserState>) {}

  ngOnInit(): void {
    this.store.pipe(select(fromUserSelectors.selectCurrentOrganizationUuid)).pipe(
      mergeMap(org => this.findRolesService.fetch({organizationUuid: org }).pipe(take(1))),
    ).subscribe(result => {
      if (result?.data?.roles) {
        this.roles = result.data.roles as Role[];
        this.isLoading = false;
      }
    });
  }

  handleSubmitEmails(emails: string[]): void {
    this.emails = emails;
    this.step = 1;
  }

  handleSendInvite(users: Invite[]): void {
    this.sendInvitationService.mutate({
      input: {
        organizationUuid: localStorage.getItem('selected_org') || '',
        users: users.map(user => ({email: user.email, roleUuid: user.role.uuid})),
      },
    }).subscribe(() => {
      this.step = 2;
    });
  }
}




