import { Component, OnInit } from '@angular/core';
import { Member } from './member';

// TODO: Move to service component
import { FindMembersGQL, UserEdge } from 'src/app/shared/services/graphql/graphql.service';
import { take } from 'rxjs/operators';
import { OrganizationService } from 'src/app/select-organization/services/organization.service';


@Component({
  selector: 'org-admin-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.less'],
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  isLoading: boolean = true;

  constructor(private findMembersService: FindMembersGQL, 
              private organizationService: OrganizationService) {}

  ngOnInit() {
    this.organizationService.getUsers().subscribe(result => {
        this.members = this.organizationService.mapUsersToMembers((result?.data.users?.edges || []) as UserEdge[])
        this.isLoading = false;
      }
    )
  }

}
