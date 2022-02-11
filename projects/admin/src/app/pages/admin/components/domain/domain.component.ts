import { Component, OnInit } from '@angular/core';
import { Domain } from './domain';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'org-admin-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss'],
})
export class DomainComponent implements OnInit {
  isNewModal = false;
  validateForm!: FormGroup;
  domains: Domain[] = [
    {
      name: 'action.crowdskout.com',
      verified: true,
      deleted: true,
      created_at: '4/30/18 9:24 AM',
    },
    {
      name: 'george.com',
      verified: false,
      deleted: true,
      created_at: '5/3/18 10:32 AM',
    },
    {
      name: 'forms.liberal.org.au',
      verified: true,
      deleted: true,
      created_at: '1/6/19 8:12 AM',
    },
    {
      name: 'action.landman.org',
      verified: true,
      deleted: true,
      created_at: '1/6/19 8:12 AM',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      domain: [null, [Validators.required]],
    });
  }

  showNewModal(): void {
    this.isNewModal = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.isNewModal = false;
    } else {
      Object.values(this.validateForm.controls).forEach(
        (control: AbstractControl) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        }
      );
    }
  }

  handleClose(): void {
    this.isNewModal = false;
  }
}
