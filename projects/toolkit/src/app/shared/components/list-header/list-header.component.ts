import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tool-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.less']
})
export class ListHeaderComponent implements OnInit {

  constructor() { }
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
  @Input() iconColor: string = '';

  @Output() createElementClick = new EventEmitter();

  ngOnInit(): void {
  }

  createElement() {
    this.createElementClick.emit();
  }
}
