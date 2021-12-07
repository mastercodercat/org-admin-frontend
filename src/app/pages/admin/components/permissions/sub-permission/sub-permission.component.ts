import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'org-admin-permission-sub',
  templateUrl: './sub-permission.component.html',
  styleUrls: ['./sub-permission.component.less'],
})
export class SubPermissionComponent implements OnInit {
  @Input() title: string = '';
  @Input() description?: string = '';

  constructor() {}

  ngOnInit() {}
}
