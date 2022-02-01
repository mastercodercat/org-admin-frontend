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
import { Organization } from '../../shared/models/organization.model';

@Component({
  selector: 'org-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  emailPassNotValid = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private store: Store<UserState>,
    private userService: UserService) {
    super();
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
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
  async login(): Promise<void> {
    // Update form to show correct validation
    for (const i in this.loginForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.loginForm.controls, i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    // If form is filled out correctly, try to log in
    if (this.loginForm.status === 'VALID') {
      // Use auth service to send credentials to Auth0
      await this.auth.login(this.loginForm.get('email')?.value as string, this.loginForm.get('password')?.value as string);
    }
  }

  /**
   * View password when typing to see if it's correct
   *
   * @memberof LoginComponent
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Use router to navigate to the home page or select organization if user has access to multiple orgs
   *
   * @private
   * @memberof LoginComponent
   */
  private navigateHome(): void {
    this.emailPassNotValid = false;
    this.store.pipe(select(fromUserSelectors.selectActivePendingOrganizations), takeUntil(this.ngUnsubscribe$))
      .subscribe((org: Organization[]): void => {
        // If user has access to more than one organization or none, we show them the select organizatiions screen
        if (org?.length > 1 || org?.length === 0) {
          this.router.navigate(['/select-organization']).then(() => {}).catch(() => {});
        } else if (org?.length === 1) {
          const orgUuid = org[0].uuid;
          // If user has access to only one organization we set the selected org uuid and show them the dashboard screen
          localStorage.setItem('selected_org', orgUuid);
          this.userService.addSelectedOrganizationUuid(orgUuid);
          this.router.navigate(['/home']).then(() => {}).catch(() => {});
        }
      });
  }

  /**
   * Show error explaining that login info may be incorrect
   *
   * @private
   * @memberof LoginComponent
   */
  private showLoginError(): void {
    this.emailPassNotValid = true;
  }
}
