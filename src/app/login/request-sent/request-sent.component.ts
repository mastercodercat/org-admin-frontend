import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'org-request-sent',
  templateUrl: './request-sent.component.html',
  styleUrls: ['./request-sent.component.less'],
})
export class RequestSentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('init request sent component');
  }

}
