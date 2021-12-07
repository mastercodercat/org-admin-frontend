import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Organization } from 'src/app/pages/organization/shared/organization.model';
import { OrganizationService } from 'src/app/select-organization/services/organization.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AppState } from 'src/app/store/reducers';
import * as fromLoginSelectors from '../store/selectors/login.selectors';
import * as fromUserSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'org-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  emailPassNotValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>,
    private userService: UserService,
    private orgService: OrganizationService) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });

    // Select login success value from store and if login is successful, navigate to home page
    this.store.pipe(select(fromLoginSelectors.selectLoginSuccess), takeUntil(this.ngUnsubscribe$))
      .subscribe(success => {
        if (success) {
          this.userService.getUserInfo();
          this.orgService.getOrganizations().subscribe(result => { // TODO: Clean this up, subscriptions inside of subscriptions are very bad
            this.userService.addOrganizations(result.data.organizations as Organization[]);
            this.navigateHome();
          });
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
   * Use router to navigate to the home page
   *
   * @private
   * @memberof LoginComponent
   */
  private navigateHome() {
    this.emailPassNotValid = false;
    this.store.pipe(select(fromUserSelectors.selectUserOrganizations), takeUntil(this.ngUnsubscribe$)) // TODO: FIX THIS!! I am deeply embarrassed by the amount of nesting going on here
      .subscribe(orgs => {
        if (orgs && orgs?.length > 1) {
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
