import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'org-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.less'],
})
export class PasswordValidatorComponent {
  @Input() control: AbstractControl = new FormControl();

  constructor() { }
}
