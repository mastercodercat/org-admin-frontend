import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetUserPasswordGQL } from 'src/app/shared/services/graphql/graphql.service';

@Component({
  selector: 'org-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token = '';
  passwordFocus = false;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resetUserPassword: ResetUserPasswordGQL
  ) {
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required, this.confirmValidator]],
      passwordConfirmation: [null, [this.confirmMatch]],
    });
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams.token || '';
  }

  /**
   * Send new password and token to the backend
   *
   * @memberof ResetPasswordComponent
   */
  resetPassword() {
    // Send new password and token to backend
    // Log user in with new password
    this.resetUserPassword
      .mutate({
        input: {
          token: this.token,
          password: this.resetPasswordForm.get('password')?.value,
        },
      })
      .subscribe((res) => {
        this.router.navigate(['/login']);
      });
  }

  /**
   * Check if the password matches
   *
   * @memberof ResetPasswordComponent
   */
  validateConfirmPassword(): void {
    setTimeout(() =>
      this.resetPasswordForm.controls.passwordConfirmation.updateValueAndValidity()
    );
  }

  /**
   * Custom validator to check if the passwords match
   *
   * @memberof ResetPasswordComponent
   */
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    const value = control.value || '';
    const validator: any = {};

    if (value.length < 8) {
      validator.length = true;
    }
    if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) {
      validator.special = true;
    }
    if (!/\d/.test(value)) {
      validator.number = true;
    }
    if (!/[a-z]/.test(value)) {
      validator.lowercase = true;
    }
    if (!/[A-Z]/.test(value)) {
      validator.uppercase = true;
    }

    return validator;
  };

  confirmMatch = (control: FormControl): { [s: string]: boolean } => {
    if (control.value !== this.resetPasswordForm?.controls.password.value) {
      return { mismatch: true, error: true };
    }
    return {};
  };
}
