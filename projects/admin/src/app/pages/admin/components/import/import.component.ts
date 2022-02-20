import { Component } from '@angular/core';

@Component({
  selector: 'org-admin-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  isVisible = false;
  current = 0;

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.current = 0;
    this.isVisible = false;
  }

  handleNext(): void {
    this.current += 1;
  }
}
