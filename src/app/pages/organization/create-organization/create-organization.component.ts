import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateOrganizationGQL, OrganizationEnumType, SubscriptionEnumType } from 'src/app/shared/services/graphql/graphql.service';

@Component({
  selector: 'org-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.less']
})
export class CreateOrganizationComponent implements OnInit {
  createOrgForm: FormGroup;
  subTypes: string[][];
  orgTypes: string[][];

  constructor(private fb: FormBuilder, private createOrgService: CreateOrganizationGQL, private router: Router) {
    this.createOrgForm = this.fb.group({
      subscriptionType: [null, [Validators.required]],
      orgName: [null, [Validators.required]],
      orgType: [null, [Validators.required]],
      adminName: [null],
      adminPhone: [null],
      adminEmail: [null, [Validators.required, Validators.email]]
    });
    this.subTypes = Object.entries(SubscriptionEnumType);
    this.orgTypes = Object.entries(OrganizationEnumType);
  }

  ngOnInit(): void {
  }

  /**
   * Calls the create organization mutation with form information
   *
   * @memberof CreateOrganizationComponent
   */
  createOrg() {
    this.createOrgService.mutate({
      input: {
        name: this.createOrgForm.get('orgName')?.value,
        adminEmail: this.createOrgForm.get('adminEmail')?.value,
        subscriptionType: this.createOrgForm.get('subscriptionType')?.value,
        organizationType: this.createOrgForm.get('orgType')?.value,
        organizationUuid: localStorage.getItem('selected_org')
      }
    }).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

}
