import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUserSelectors from '../../store/selectors/user.selectors';
import { AppState } from 'src/app/store/reducers';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { take } from 'rxjs/operators';
import { FindOrganizationsWithRolesGQL, FindRolesGQL, FindUserGQL, SendInvitationGQL, StatusEnumType, UpdateOrganizationUserGQL, UpdateUserGQL, UserType } from 'src/app/shared/services/graphql/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'org-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  userInfo$!: Observable<UserState>;
  user: UserType | undefined;
  userRole: any = {};
  organizationRoles: any = {};

  removeOrganization: any;

  changeOrganization: any;
  changeUserRole: any;
  organizations: any[] = [];

  addOrganization: any;

  title = '';

  constructor(
    private findRolesService: FindRolesGQL,
    private findUserService: FindUserGQL,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private findOrganizationsService: FindOrganizationsWithRolesGQL,
    private updateOrganizationUserService: UpdateOrganizationUserGQL,
    private updateUserService: UpdateUserGQL,
    private sendInvitationService: SendInvitationGQL,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.pipe(select(fromUserSelectors.selectUser));
    this.findUserService.fetch({ input: { uuid: this.route.snapshot.paramMap.get('id') } }).pipe(take(1)).subscribe(result => {
      this.user = <UserType>result.data.user;

      (this.user.organizationUsers || []).map(organizationUser => {
        this.userRole[organizationUser?.organizationUuid || ''] = organizationUser?.role;

        if (organizationUser?.organizationUuid === localStorage.getItem('selected_org')) {
          this.title = organizationUser.title || '';
        }

        this.findRolesService.fetch({ input: { organizationUuid: organizationUser?.organizationUuid } }).pipe(take(1)).subscribe(result => {
          this.organizationRoles[organizationUser?.organizationUuid || ''] = result.data.roles || [];
        });
      });

      this.findOrganizationsService.fetch().pipe(take(1)).subscribe(result => {
        this.mapOrganizations(result.data.organizations || []);
      });
    });
  }

  mapOrganizations(organizations: any[]) {
    (organizations || []).map(organization => {
      if (this.user?.organizationUsers?.findIndex(organizationUser => organizationUser?.organizationUuid === organization.uuid) === -1) {
        this.organizations.push({
          name: organization?.name || '',
          uuid: organization?.uuid || '',
          organizationUuid: organization?.organizationUuid || '',
          roles: organization?.roles,
        });
      }

      if (organization?.organizations && organization?.organizations.length > 0) {
        this.mapOrganizations(organization?.organizations || []);
      }
    });
  }

  openRoleUpdate(organization: any, role: any) {
    this.changeOrganization = organization
    this.changeUserRole = role;
  }

  handleChangeRoleCancel() {
    this.changeOrganization = undefined;
  }

  openRemoveModal(organization: any) {
    this.removeOrganization = organization;
  }

  handleRemoveCancel() {
    this.removeOrganization = undefined;
  }

  handleOpenAddModal(organization: any) {
    this.addOrganization = organization;
  }

  handleAddCancel() {
    this.addOrganization = '';
  }

  handleChangeRole() {
    this.updateOrganizationUserService.mutate({
      input: {
        uuid: this.changeOrganization.uuid,
        userUuid: this.user?.uuid,
        organizationUuid: this.changeOrganization.organizationUuid,
        roleUuid: this.changeUserRole.uuid,
      }
    }).subscribe((result) => {
      this.userRole[result.data?.updateOrganizationUser?.organizationUser?.organizationUuid || ''] = this.changeUserRole;
    });

    this.changeOrganization = '';
  }

  handleRemove() {
    this.updateOrganizationUserService.mutate({
      input: {
        uuid: this.removeOrganization.uuid,
        userUuid: this.user?.uuid,
        organizationUuid: this.removeOrganization.organizationUuid,
        roleUuid: this.userRole[this.removeOrganization.organizationUuid || ''].uuid,
        status: StatusEnumType.Deleted
      }
    }).subscribe((result) => {
      if (this.user?.organizationUsers) {
        const newOrganizationUsers = (this.user.organizationUsers || []).map(organizationUser => {
          if (organizationUser) {
            let newOrganizationUser = { ...organizationUser };
            if (organizationUser && organizationUser?.organizationUuid === result.data?.updateOrganizationUser?.organizationUser?.organizationUuid) {
              newOrganizationUser['status'] = StatusEnumType.Deleted;
            }
            return newOrganizationUser;
          }
          return organizationUser;
        });

        this.user = {
          ...this.user,
          organizationUsers: newOrganizationUsers
        }
      }
    });

    this.handleRemoveCancel();
  }

  handlePhoneNumberChange(ev: any) {
    this.updateUserService.mutate({
      input: {
        uuid: this.user?.uuid || '',
        phone: ev.target.value,
      }
    }).subscribe();
  }

  handleAdd() {
    this.sendInvitationService.mutate({
      input: {
        organizationUuid: this.addOrganization.uuid || '',
        users: [{
          email: this.user?.email || '',
          roleUuid: this.addOrganization.roles[0].uuid
        }],
      }
    }).subscribe(result => {
      if ((result.data?.inviteOrganizationUsers?.invitedUsers?.length || 0) > 0) {
        const orgUuid = result.data?.inviteOrganizationUsers?.organizationUuid || '';
        this.organizations = this.organizations.filter(organization => organization.uuid !== orgUuid)

        this.notification.blank(
          'Invitation Sent',
          'We have sent user invitation for the organization',
          { nzPlacement: 'bottomLeft' }
        );
      }
    });
    this.handleAddCancel();
  }
}
