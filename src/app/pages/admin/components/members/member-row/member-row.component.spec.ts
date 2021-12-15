import { RouterTestingModule } from '@angular/router/testing';
import {
  Spectator,
  byText,
  createComponentFactory,
  byPlaceholder,
} from '@ngneat/spectator';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ExportOutline,
  UserOutline,
  MoreOutline,
  CaretLeftOutline,
} from '@ant-design/icons-angular/icons';
import { reducers, metaReducers } from 'src/app/store/reducers';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { MemberRowComponent } from './member-row.component';
import { Member } from '../member';

const icons: IconDefinition[] = [
  ExportOutline,
  UserOutline,
  MoreOutline,
  CaretLeftOutline,
];

describe('MemberRowComponent', () => {
  let spectator: Spectator<MemberRowComponent>;
  const createComponent = createComponentFactory({
    component: MemberRowComponent,
    imports: [
      StoreModule.forRoot(reducers, { metaReducers }),
      CommonModule,
      SharedModule,
      NzIconModule.forRoot(icons),
    ],
  });
  const member: Member = {
    uuid: '4',
    name: 'Member',
    firstName: 'FirstName',
    lastName: 'lastName',
    position: 'Position',
    email: 'Email',
    phone: 'Phone',
    organizationUsers: [
      {
        organization: {
          uuid: '1',
          name: 'Organization 1',
        },
        role: {
          uuid: '1',
          name: 'Organization Role 1',
        },
      },
      {
        organization: {
          uuid: '2',
          name: 'Organization 2',
        },
        role: {
          uuid: '2',
          name: 'Organization Role 2',
        },
      },
    ],
  };

  beforeEach(() => {
    spectator = createComponent({
      props: {
        member: member,
      },
    });
    spectator.detectChanges();
  });

  it('should display ui', () => {
    expect(spectator.query(byText(member.name))).toExist();
    expect(spectator.query(byText(member.position))).toExist();
    expect(spectator.query(byText(member.email))).toExist();
    if (member.phone) {
      expect(spectator.query(byText(member.phone))).toExist();
    }
    for (const organization of member.organizationUsers) {
      expect(spectator.query(byText(organization.organization.name))).toExist();
      expect(spectator.query(byText(organization.role.name))).toExist();
    }
  });
});
