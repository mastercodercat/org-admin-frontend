import { Component, Input } from '@angular/core';
import { Member } from '../member';
@Component({
  selector: '.org-admin-member-row',
  templateUrl: './member-row.component.html',
  styleUrls: ['./member-row.component.less'],
})
export class MemberRowComponent {
  @Input() member!: Member;
  @Input() members: Member[] = [];

  isDetail = false;

  constructor() {}

  more(event: MouseEvent): void {
    event.preventDefault();

    this.isDetail = !this.isDetail;
  }

}
