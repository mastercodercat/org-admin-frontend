import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Invite, Role } from '../../invite.component';

@Component({
  selector: 'org-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.less']
})
export class AssignRolesComponent implements OnInit {
  @Input() emails: string[] = [];
  @Input() roles: Role[] = [];
  @Output() sendInvite = new EventEmitter();

  invites: Invite[] = [];
  defaultRole: Role | undefined;

  constructor() {}

  ngOnInit(): void {
    this.defaultRole = this.roles[0];
    this.invites = this.emails.map(email => ({
      email,
      role: this.roles[0],
    }));
  }

  handleDefaultRoleChange(role: Role) {
    this.invites = this.invites.map(invite => ({
      email: invite.email,
      role,
    }));
  }

  handleSendInvite() {
    this.sendInvite.emit(this.invites);
  }
}
