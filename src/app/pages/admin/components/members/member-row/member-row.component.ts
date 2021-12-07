import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Member } from '../member';
@Component({
  selector: '.org-admin-member-row',
  templateUrl: './member-row.component.html',
  styleUrls: ['./member-row.component.less'],
})
export class MemberRowComponent implements OnInit {
  isDetail: boolean = false;
  @Input() member: Member = new Member();
  @Input() members: Member[] = [];

  constructor() {}

  ngOnInit() {}

  more(event: MouseEvent) {
    event.preventDefault();

    this.isDetail = !this.isDetail;
  }

}
