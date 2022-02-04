import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'exp-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() title = 'Loading Map';

  constructor() { }

  ngOnInit(): void {}

}
