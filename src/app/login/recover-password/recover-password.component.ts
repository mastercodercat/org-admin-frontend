import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestUserPasswordResetGQL } from '../../shared/services/graphql/graphql.service';

@Component({
  selector: 'org-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.less'],
})
export class RecoverPasswordComponent implements OnInit {
  recoverPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private requestPasswordChange: RequestUserPasswordResetGQL) { }

  ngOnInit(): void {
    this.recoverPasswordForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  /**
   * Send email to reset users password
   *
   * @memberof RecoverPasswordComponent
   */
  resetPassword(): void {
    const email = this.recoverPasswordForm.get('email')?.value as string;
    this.requestPasswordChange.mutate({ email })
      .subscribe(() => {
        this.router.navigate(['/login/request-sent']);
      });
  }

}
