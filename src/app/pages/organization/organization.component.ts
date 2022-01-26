import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'org-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.less'],
})
export class OrganizationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('init organization');
  }

}
