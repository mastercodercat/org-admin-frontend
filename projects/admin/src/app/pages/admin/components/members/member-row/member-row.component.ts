import { Component, Input } from '@angular/core';
import { Member } from '../member.model';
@Component({
  selector: '.org-admin-member-row',
  templateUrl: './member-row.component.html',
  styleUrls: ['./member-row.component.scss'],
})
export class MemberRowComponent {
  @Input() member!: Member;

  isDetail = false;

  constructor() {}

  more(event: MouseEvent): void {
    event.preventDefault();

    this.isDetail = !this.isDetail;
  }

}
