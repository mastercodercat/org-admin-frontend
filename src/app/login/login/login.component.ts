import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as fromLoginSelectors from '../store/selectors/login.selectors';
import * as fromUserSelectors from '../../store/selectors/user.selectors';
import * as fromAppSelectors from '../../store/selectors/app.selectors';
import { UserState } from '../../store/reducers/user.reducer';
import { BaseComponent } from '../../core/base/base.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'org-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  emailPassNotValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private store: Store<UserState>,
    private userService: UserService,) {
    super();
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    // Select login and org success value from store and if successful, navigate to home page
    this.store.pipe(select(fromAppSelectors.selectLoginOrgSuccess), takeUntil(this.ngUnsubscribe$))
      .subscribe(success => {
        if (success) {
          this.userService.getUserInfo();
          this.navigateHome();
        }
      });

    // Select login failure value from store and if login fails, show error
    this.store.pipe(select(fromLoginSelectors.selectLoginFailure), takeUntil(this.ngUnsubscribe$))
      .subscribe(failure => {
        if (failure.failure) {
          this.showLoginError();
        }
      });
  }

  /**
   * Login using Auth0 to authenticate user
   *
   * @memberof LoginComponent
   */
  login() {
    // Update form to show correct validation
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    // If form is filled out correctly, try to log in
    if (this.loginForm.status === 'VALID') {
      // Use auth service to send credentials to Auth0 
      this.auth.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    }
  }

  /**
   * View password when typing to see if it's correct
   *
   * @memberof LoginComponent
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Use router to navigate to the home page or select organization if user has access to multiple orgs
   *
   * @private
   * @memberof LoginComponent
   */
  private navigateHome() {
    this.emailPassNotValid = false;
    this.store.pipe(select(fromUserSelectors.selectOrganizationsCount), takeUntil(this.ngUnsubscribe$))
      .subscribe((count: number) => {
        if (count > 1) {
          this.router.navigate(['/select-organization']);
        } else {
          this.router.navigate(['/home']);
        }
      });
    }

  /**
   * Show error explaining that login info may be incorrect
   *
   * @private
   * @memberof LoginComponent
   */
  private showLoginError() {
    this.emailPassNotValid = true;
  }
}
