import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'org-admin-permission-sub',
  templateUrl: './sub-permission.component.html',
  styleUrls: ['./sub-permission.component.less'],
})
export class SubPermissionComponent implements OnInit {
  @Input() title = '';
  @Input() description?: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('init subpermission');
  }
}
