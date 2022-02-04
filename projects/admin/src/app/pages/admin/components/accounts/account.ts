export class Account {
  name = '';
  members?: number = 0;
  uuid?: string = '';
  subaccounts?: Account[] = [];
  status?: string = '';
}
