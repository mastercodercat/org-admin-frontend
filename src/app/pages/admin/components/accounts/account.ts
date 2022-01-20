export class Account {
  name: string = '';
  members?: number = 0;
  uuid?: string = '';
  subaccounts?: Account[] = [];
  status?: string = '';
}
