import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
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

import { Account } from '../account';
import { AccountCollapseComponent } from './account-collapse.component';

const icons: IconDefinition[] = [
  ExportOutline,
  UserOutline,
  MoreOutline,
  CaretLeftOutline,
];

describe('AccountCollapseComponent', () => {
  let spectator: Spectator<AccountCollapseComponent>;
  const createComponent = createComponentFactory({
    component: AccountCollapseComponent,
    imports: [
      StoreModule.forRoot(reducers, { metaReducers }),
      CommonModule,
      SharedModule,
      NzIconModule.forRoot(icons),
    ],
  });
  let accounts: Array<Account> = [
    {
      name: 'Account 1',
      members: 15,
      subaccounts: [
        {
          name: 'Account 1-1',
          members: 6,
          subaccounts: [],
        },
        {
          name: 'Account 1-2',
          members: 6,
          subaccounts: [
            {
              name: 'Account 1-2-1',
              members: 9,
              subaccounts: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Account 2',
      members: 10,
      subaccounts: [],
    },
  ];

  beforeEach(() => {
    spectator = createComponent({
      props: {
        accounts,
      },
    });
    spectator.detectChanges();
  });

  it('should display ui', () => {
    for (const account of accounts) {
      expect(spectator.query(byText(account.name))).toExist();
      if (account.members) {
        expect(spectator.query(byText(`${account.members} members`))).toExist();
      }
      if (account.subaccounts) {
        expect(
          spectator.query(byText(`| ${account.subaccounts.length} Subaccounts`))
        ).toExist();
      }
    }
  });
});
