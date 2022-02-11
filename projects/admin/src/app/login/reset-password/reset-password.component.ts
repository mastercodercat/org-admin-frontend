import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Observable } from 'rxjs';
import { ResetUserPasswordGQL } from '../../shared/services/graphql/graphql.service';
import { UserService } from '../../../../../../src/app/services/user/user.service';
import { passwordValidator } from '../../utils/input';

@Component({
  selector: 'org-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  token = '';
  passwordFocus = false;
  passwordVisible = false;
  passwordChangeSuccess = false;
  isTokenValid$: Observable<Maybe<boolean> | undefined>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resetUserPassword: ResetUserPasswordGQL,
    private userService: UserService,
  ) {
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required, passwordValidator]],
      passwordConfirmation: [null, [this.confirmMatch]],
    });

    this.token = this.activatedRoute.snapshot.queryParams.token as string || '';
    this.isTokenValid$ = this.userService.isPasswordResetTokenValid(this.token);
  }

  /**
   * Send new password and token to the backend
   *
   * @memberof ResetPasswordComponent
   */
  resetPassword(): void {
    // Send new password and token to backend
    // Log user in with new password
    this.resetUserPassword
      .mutate({
        input: {
          token: this.token,
          password: this.resetPasswordForm.get('password')?.value as string,
        },
      })
      .subscribe(() => {
        this.passwordChangeSuccess = true;
        // password has been reset , redirecting to login... (3 seconds)?
        setTimeout(() => {
          this.router.navigate(['/login'])
            .then(() => {})
            .catch(() => {});
        }, 3000);
      });
  }

  /**
   * Check if the password matches
   *
   * @memberof ResetPasswordComponent
   */
  validateConfirmPassword(): void {
    setTimeout(() =>
      this.resetPasswordForm.controls.passwordConfirmation.updateValueAndValidity(),
    );
  }

  confirmMatch = (control: FormControl): { [s: string]: boolean } => {
    if (control.value !== this.resetPasswordForm?.controls.password.value) {
      return { mismatch: true, error: true };
    }
    return {};
  };
}
