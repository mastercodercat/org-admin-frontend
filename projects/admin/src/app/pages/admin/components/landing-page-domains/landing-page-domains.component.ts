import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DomainsState } from '../../store/domains.reducer';
import { Domain } from './domain.model';
import * as fromSelectors from '../../store/domains.selectors';
import * as fromActions from '../../store/domains.actions';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { CreateDomainGQL, DomainTypeEnum } from 'projects/admin/src/app/shared/services/graphql/graphql.service';

@Component({
  selector: 'org-landing-page-domains',
  templateUrl: './landing-page-domains.component.html',
  styleUrls: ['./landing-page-domains.component.scss'],
})
export class LandingPageDomainsComponent implements OnInit {
  isNewModal = false;
  validateForm!: FormGroup;
  domains: Domain[] = [];
  currentDomain: Domain = {} as Domain;
  isLoading$: Observable<boolean> = of<boolean>(true);

  constructor(
    private fb: FormBuilder,
    private createDomainService: CreateDomainGQL,
    private store: Store<DomainsState>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      domain: new FormControl(),
    });
    this.store.dispatch(fromActions.loadDomains());
    this.isLoading$ = this.store.pipe(select(fromSelectors.selectIsLoading));
    this.store.pipe(select(fromSelectors.selectDomains))
      .subscribe((domains: Domain[]) => this.domains = domains);
  }

  showNewModal(): void {
    this.isNewModal = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      this.createDomainService.mutate({
        input: {
          hostname: this.validateForm.value['domain'],
          domainType: DomainTypeEnum.Email,
        },
      }).subscribe(result => {
        console.log(result);
        if (result?.errors && result?.errors.length > 0) {
          // this.error = result?.errors.join(' ');
        } else {
          this.router.navigate([result?.data?.domain?.uuid])
            .then(() => {})
            .catch(() => {});
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
        }
      );
    }
  }

  handleClose(): void {
    this.isNewModal = false;
  }

  setCurrent(domain: Domain): void {
    this.currentDomain = domain;
  }

  view(): void {
    if (this.currentDomain) {
      this.router.navigate([this.currentDomain.uuid])
        .then(() => {})
        .catch(() => {});
    }
  }
}
