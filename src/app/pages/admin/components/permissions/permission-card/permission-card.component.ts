import { Component, OnInit, Input } from '@angular/core';
import { Permission } from '../permission';

@Component({
  selector: 'org-admin-permission-card',
  templateUrl: './permission-card.component.html',
  styleUrls: ['./permission-card.component.less'],
})
export class PermissionCardComponent implements OnInit {
  @Input() title = '';
  @Input() permissions: Permission[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('init permission card');
  }
}
