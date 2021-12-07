import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FindRolesGQL, SendInvitationGQL } from 'src/app/shared/services/graphql/graphql.service';

export interface Role {
  name: string;
  uuid: string;
}

export interface Invite {
  email: string;
  role: Role;
}

@Component({
  selector: 'org-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.less']
})
export class InviteComponent implements OnInit {
  step = 0;
  roles: Role[] = [];
  isLoading = true;

  emails: string[] = [];
  constructor(private findRolesService: FindRolesGQL, private sendInvitationService: SendInvitationGQL) {}

  ngOnInit() {
    this.findRolesService.fetch({ input: {organizationUuid: localStorage.getItem('selected_org') }}).pipe(take(1)).subscribe(result => {
      console.log(result);
      if (result?.data?.roles) {
        this.roles = result.data.roles as any[];
        this.isLoading = false;
      }
    });
  }

  handleSubmitEmails(emails: string[]) {
    this.emails = emails;
    this.step = 1;
  }

  async handleSendInvite(users: Invite[]) {
    this.sendInvitationService.mutate({
      input: {
        organizationUuid: localStorage.getItem('selected_org') || '',
        users: users.map(user => ({email: user.email, roleUuid: user.role.uuid})),
      }
    }).subscribe(result => {
      console.log(result, users);
      this.step = 2;
    });
  }
}
