import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AcceptOrganizationUserInviteGQL, ValidateAssociationTokenGQL } from 'src/app/shared/services/graphql/graphql.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { passwordValidator } from '../../utils/input';

@Component({
  selector: 'org-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less']
})
export class JoinComponent extends BaseComponent implements OnInit {
  isLoading = true;
  isFormLoading = false;
  token = '';

  status = '';
  passwordVisible = false;
  password = '';
  email = '';
  name = '';

  joinForm!: FormGroup;
  showPassword: boolean = false;
  emailPassNotValid: boolean = false;
  passwordFocus = false;

  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private validateAssociationTokenService: ValidateAssociationTokenGQL,
    private auth: AuthService,
    private user: UserService,
    private acceptInviteService: AcceptOrganizationUserInviteGQL,
  ) {
    super();
  }

  ngOnInit() {
    this.isLoading = true;
    this.token = this.route.snapshot.queryParams.token || '';

    this.validateAssociationTokenService.fetch({token: this.token}).pipe(take(1)).subscribe(result => {
      this.isLoading = false;
      this.status = result.data.validateAssociationToken?.status || '';
      this.email = result.data.validateAssociationToken?.email || '';
      this.name = result.data.validateAssociationToken?.name || '';

      if (this.status === 'EXISTING') {
        this.joinForm = this.fb.group({
          password: ['', [Validators.required, passwordValidator]],
        });
      }

      if (this.status === 'NEW') {
        this.joinForm = this.fb.group({
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          password: ['', [Validators.required, passwordValidator]],
        });
      }
    });
  }

  login() {
    if (this.joinForm.status === 'VALID') {
      this.isFormLoading = true;
      let firstName = '';
      let lastName = '';

      if (this.status === 'EXISTING') {
        firstName = this.name;
      } else if (this.status === 'NEW') {
        firstName =  this.joinForm.get('firstName')?.value;
        lastName = this.joinForm.get('lastName')?.value;
      }

      this.error = '';
      this.acceptInviteService.mutate({input: {
        token: this.token,
        user: {
          firstName: this.joinForm.get('firstName')?.value,
          lastName: this.joinForm.get('lastName')?.value,
          password: this.joinForm.get('password')?.value,
        }
      }}).subscribe(result => {
        if (result?.errors && result?.errors.length > 0) {
          this.error = result?.errors.join(' ');
        } else {
          this.emailPassNotValid = false;
          this.authLogin(this.email, this.joinForm.get('password')?.value);
        }
        this.isFormLoading = false;
      });
    }
  }

  authLogin(email: string, password: string) {
    this.auth.login(email, password)
      .then(() => {
        this.user.getUserInfo();
        this.router.navigate(['/home']);
        this.isFormLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.emailPassNotValid = true;
        this.isFormLoading = false;
      })
  }

}
