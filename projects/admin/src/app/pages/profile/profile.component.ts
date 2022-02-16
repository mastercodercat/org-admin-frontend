import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as fromUserSelectors from '../../../../../../src/app/store/selectors/user.selectors';
import {
  FindOrganizationsWithRolesGQL,
  FindRolesGQL,
  FindUserGQL,
  SendInvitationGQL,
  StatusEnum,
  UpdateOrganizationUserGQL,
  UpdateUserGQL,
  DeleteOrganizationUserGQL,
} from '../../shared/services/graphql/graphql.service';
import { UserState } from '../../../../../../src/app/store/reducers/user.reducer';
import { AppState } from '../../../../../../src/app/store/reducers';
import { User } from '../../../../../../src/app/shared/models/user.model';
import { Organization } from '../../../../../../src/app/shared/models/organization.model';
import { Role } from '../../../../../../src/app/shared/models/role.model';
import { OrganizationUser } from '../../../../../../src/app/shared/models/organization-user.model';

@Component({
  selector: 'org-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo$!: Observable<UserState>;
  user: User | undefined;
  userRole: { [key: string]: Role } = {};
  organizationRoles: { [key: string]: Role[] } = {};

  removeOrganization: Organization | OrganizationUser | undefined;

  changeOrganization: Organization | OrganizationUser | undefined;
  changeUserRole!: Role;
  organizations: Organization[] = [];

  addOrganization: Organization | undefined;

  title = '';

  constructor(
    private findRolesService: FindRolesGQL,
    private findUserService: FindUserGQL,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private findOrganizationsService: FindOrganizationsWithRolesGQL,
    private updateOrganizationUserService: UpdateOrganizationUserGQL,
    private deleteOrganizationUser: DeleteOrganizationUserGQL,
    private updateUserService: UpdateUserGQL,
    private sendInvitationService: SendInvitationGQL,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
    const uuid: string = this.route.snapshot.paramMap.get('id') || '';
    this.findUserService.fetch({ uuid }).pipe(take(1)).subscribe(result => {
      this.user = result.data.user as User;

      // (this.user.organizationUsers || []).map(organizationUser => {
      //   if (organizationUser) {
      //     this.userRole[organizationUser?.organizationUuid] = organizationUser?.role;
      //   }

      //   if (organizationUser?.organizationUuid === localStorage.getItem('selected_org')) {
      //     this.title = organizationUser.title || '';
      //   }

      //   this.findRolesService.fetch({ organizationUuid: organizationUser?.organizationUuid }).pipe(take(1)).subscribe(result => {
      //     if (organizationUser?.organizationUuid) {
      //       this.organizationRoles[organizationUser?.organizationUuid || ''] = (result.data.roles || []) as any;
      //     }
      //   });
      // });

      this.findOrganizationsService.fetch().pipe(take(1)).subscribe(result => {
        this.mapOrganizations(result.data.organizations as Organization[] || []);
      });
    });
  }

  mapOrganizations(organizations: Organization[]): void {
    (organizations || []).map(organization => {
      // if (this.user?.organizationUsers?.findIndex(organizationUser => organizationUser?.organizationUuid === organization.uuid) === -1) {
      //   this.organizations.push({
      //     name: organization?.name || '',
      //     uuid: organization?.uuid || '',
      //     organizationUuid: organization?.organizationUuid || '',
      //     roles: organization?.roles,
      //     status: organization?.status,
      //   });
      // }

      if (organization?.organizations && organization?.organizations.length > 0) {
        this.mapOrganizations(organization?.organizations || []);
      }
    });
  }

  openRoleUpdate(organization: Organization | OrganizationUser, role: Role): void {
    this.changeOrganization = organization;
    this.changeUserRole = role;
  }

  handleChangeRoleCancel(): void {
    this.changeOrganization = undefined;
  }

  openRemoveModal(organization: Organization | OrganizationUser): void {
    this.removeOrganization = organization;
  }

  handleRemoveCancel(): void {
    this.removeOrganization = undefined;
  }

  handleOpenAddModal(organization: Organization): void {
    this.addOrganization = organization;
  }

  handleAddCancel(): void {
    this.addOrganization = undefined;
  }

  handleChangeRole(): void {
    this.updateOrganizationUserService.mutate({
      input: {
        uuid: this.changeOrganization?.uuid || '',
        roleUuid: this.changeUserRole.uuid,
      },
    }).subscribe(result => {
      this.userRole[result.data?.updateOrganizationUser?.organizationUuid || ''] = this.changeUserRole;
    });

    this.changeOrganization = undefined;
  }

  handleRemove(): void {
    this.deleteOrganizationUser.mutate({
      uuid: this.removeOrganization?.uuid || '',
    }).subscribe(result => {
      // if (this.user?.organizationUsers) {
      //   const newOrganizationUsers = (this.user.organizationUsers || []).map(organizationUser => {
      //     if (organizationUser) {
      //       const newOrganizationUser = { ...organizationUser };
      //       if (organizationUser && organizationUser?.organizationUuid === result.data?.deleteOrganizationUser?.organizationUuid) {
      //         newOrganizationUser.status = StatusEnum.Deleted;
      //       }
      //       return newOrganizationUser;
      //     }
      //     return organizationUser;
      //   });

      //   this.user = {
      //     ...this.user,
      //     organizationUsers: newOrganizationUsers,
      //   };
      // }
    });

    this.handleRemoveCancel();
  }

  handlePhoneNumberChange(ev: Event): void {
    this.updateUserService.mutate({
      input: {
        uuid: this.user?.uuid || '',
        phone: (ev.target as HTMLInputElement).value,
      },
    }).subscribe();
  }

  handleAdd(): void {
    this.sendInvitationService.mutate({
      input: {
        organizationUuid: this.addOrganization?.uuid || '',
        users: [{
          email: this.user?.email || '',
          roleUuid: this.addOrganization?.roles[0].uuid || '',
        }],
      },
    }).subscribe(result => {
      if ((result.data?.inviteOrganizationUsers?.invitedUsers?.length || 0) > 0) {
        const orgUuid = result.data?.inviteOrganizationUsers?.organizationUuid || '';
        this.organizations = this.organizations.filter(organization => organization.uuid !== orgUuid);

        this.notification.blank(
          'Invitation Sent',
          'We have sent user invitation for the organization',
          { nzPlacement: 'bottomLeft' },
        );
      }
    });
    this.handleAddCancel();
  }
}
