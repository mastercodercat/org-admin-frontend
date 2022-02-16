import { Component, OnInit, TemplateRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FetchResult } from '@apollo/client';
import { DomainsState } from '../../store/reducers/domains.reducer';
import { Domain } from './domain.model';
import * as fromSelectors from '../../store/selectors/domains.selectors';
import * as fromActions from '../../store/actions/domains.actions';
import { UserService } from '../../../../../../../../src/app/shared/services/user/user.service';
import { DomainsService } from '../../services/domains.service';
import { BaseComponent } from '../../../../../../../../src/app/core/base.component';
import { CreateDomainMutation } from '../../../../shared/services/graphql/graphql.service';

@Component({
  selector: 'org-landing-page-domains',
  templateUrl: './landing-page-domains.component.html',
  styleUrls: ['./landing-page-domains.component.scss'],
})
export class LandingPageDomainsComponent extends BaseComponent implements OnInit {
  isNewModal = false;
  validateForm!: FormGroup;
  domains: Domain[] = [];
  currentDomain: Domain = {} as Domain;

  isLoading$: Observable<boolean> = this.store.pipe(select(fromSelectors.selectIsLoading));
  isAdmin$: Observable<boolean> = this.userService.isAdmin$();

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<DomainsState>,
              private modal: NzModalService,
              private userService: UserService,
              private domainService: DomainsService) {
    super();
  }

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      domain: new FormControl(),
    });
    this.store.dispatch(fromActions.loadDomains());
    this.store.pipe(select(fromSelectors.selectDomains), takeUntil(this.ngUnsubscribe$))
      .subscribe((domains: Domain[]) => this.domains = domains);
  }

  handleDeleteDomain(domain: Domain, tplContent: TemplateRef<any>): void {
    this.modal.create({
      nzTitle: 'Delete Domain',
      nzOkText: 'Yes, delete domain',
      nzCancelText: 'No, do not delete domain',
      nzContent: tplContent,
      nzComponentParams: {
        hostname: domain.hostname,
      },
      nzOnOk: () => this.store.dispatch(fromActions.deleteDomain({ uuid: domain.uuid })),
    });
  }

  showNewModal(): void {
    this.isNewModal = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.domainService.createDomain(this.validateForm.value['domain'])
        .subscribe((result: FetchResult<CreateDomainMutation>) => {
          console.log(result);
          if (result?.errors && result?.errors.length > 0) {
            // this.error = result?.errors.join(' ');
          } else {
            this.router.navigate([`/dashboard/landing-page-domains/${result.data?.createOrganizationHostname?.uuid || ''}`])
              .then(() => { })
              .catch(() => { });
          }
        });
      console.log('submit', this.validateForm.value);
      this.isNewModal = false;
    } else {
      Object.values(this.validateForm.controls).forEach(
        (control: AbstractControl) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        },
      );
    }
  }

  handleClose(): void {
    this.isNewModal = false;
  }

  handleView(domain: Domain): void {
    this.router.navigate([`/dashboard/landing-page-domains/${domain.uuid}`])
      .then(() => { })
      .catch(() => { });
  }
}
