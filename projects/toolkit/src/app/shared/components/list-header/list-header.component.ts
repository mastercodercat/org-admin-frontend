import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tool-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.less'],
})
export class ListHeaderComponent {

  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() iconColor = '';

  @Output() createElementClick = new EventEmitter();

  constructor() { }

  createElement(): void {
    this.createElementClick.emit();
  }
}
