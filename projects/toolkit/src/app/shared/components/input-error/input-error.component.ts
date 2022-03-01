import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tool-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
  @Input() text = '';

  constructor() { }
}
