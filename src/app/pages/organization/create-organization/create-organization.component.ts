import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateOrganizationGQL, OrganizationEnum, SubscriptionEnum } from '../../../shared/services/graphql/graphql.service';

@Component({
  selector: 'org-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.less'],
})
export class CreateOrganizationComponent {
  createOrgForm: FormGroup;
  subTypes: string[][];
  orgTypes: string[][];

  constructor(private fb: FormBuilder, private createOrgService: CreateOrganizationGQL, private router: Router) {
    this.createOrgForm = this.fb.group({
      subscriptionType: [null, [Validators.required]],
      orgName: [null, [Validators.required]],
      orgType: [null, [Validators.required]],
      adminEmail: [null, [Validators.required, Validators.email]],
    });
    this.subTypes = Object.entries(SubscriptionEnum);
    this.orgTypes = Object.entries(OrganizationEnum);
  }

  /**
   * Calls the create organization mutation with form information
   *
   * @memberof CreateOrganizationComponent
   */
  createOrg(): void {

    if (this.createOrgForm.valid) {
      this.createOrgService.mutate({
        input: {
          name: this.createOrgForm.get('orgName')?.value as string,
          adminEmail: this.createOrgForm.get('adminEmail')?.value as string,
          subscriptionType: this.createOrgForm.get('subscriptionType')?.value,
          organizationType: this.createOrgForm.get('orgType')?.value,
          organizationUuid: localStorage.getItem('selected_org'),
        },
      }).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      Object.values(this.createOrgForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
