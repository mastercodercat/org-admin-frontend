import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-org-comp-lib',
  template: `
    <p>
      example ant design button component
    </p>
    <button nz-button [nzType]="type">{{label}}</button>
  `,
  styles: [
  ],
})
export class OrgCompLibComponent {

  @Input() type: 'primary'|'dashed'|'link'|'text'|'default' = 'primary';
  @Input() label = 'Button';

  constructor() { }

}
