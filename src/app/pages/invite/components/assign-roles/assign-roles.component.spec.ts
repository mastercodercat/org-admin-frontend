import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, UserAddOutline } from '@ant-design/icons-angular/icons';

import { AssignRolesComponent } from './assign-roles.component';

const icons: IconDefinition[] = [UserOutline, UserAddOutline];

describe('AssignRolesComponent', () => {
  let spectator: Spectator<AssignRolesComponent>;
  const createComponent = createComponentFactory({
    component: AssignRolesComponent,
    imports: [
      SharedModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NzIconModule.forChild(icons),
    ],
  });
  const props = {
    roles: [
      {
        uuid: 'role_1',
        name: 'Role 1',
      },
      {
        uuid: 'role_2',
        name: 'Role 2',
      },
    ],
    emails: ['angel@angel.co', 'test@test.com'],
  };

  beforeEach(() => {
    spectator = createComponent({ props });
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query(byText('Assign members to roles'))).toExist();
    expect(spectator.query(byText('Assign all members to the role'))).toExist();
    expect(spectator.query(byText('Email'))).toExist();
    expect(spectator.query(byText('Role'))).toExist();
    expect(spectator.query(byText('Send invite'))).toExist();
  });
});
