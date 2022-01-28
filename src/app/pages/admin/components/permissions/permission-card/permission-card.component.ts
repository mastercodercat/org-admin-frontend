import { Component, Input } from '@angular/core';
import { Permission } from '../permission';

@Component({
  selector: 'org-admin-permission-card',
  templateUrl: './permission-card.component.html',
  styleUrls: ['./permission-card.component.less'],
})
export class PermissionCardComponent {
  @Input() title = '';
  @Input() permissions: Permission[] = [];

  constructor() {}
}
