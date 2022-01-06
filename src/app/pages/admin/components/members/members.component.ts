import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../select-organization/services/organization.service';
import { Member } from './member';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'org-admin-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.less'],
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  isLoading = true;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.organizationService.getUsers().subscribe(result => {
      this.members = this.organizationService.mapUsersToMembers((result?.data.users as User[]));
      this.isLoading = false;
    });
  }

}
