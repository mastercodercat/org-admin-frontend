import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DomainsState } from '../../store/domains.reducer';
import { Domain } from './domain.model';
import * as fromSelectors from '../../store/domains.selectors';
import * as fromActions from '../../store/domains.actions';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'org-landing-page-domains',
  templateUrl: './landing-page-domains.component.html',
  styleUrls: ['./landing-page-domains.component.scss'],
})
export class LandingPageDomainsComponent implements OnInit {
  isNewModal = false;
  validateForm!: FormGroup;
  domains: Domain[] = [];
  isLoading$: Observable<boolean> = of<boolean>(true);

  constructor(private fb: FormBuilder, private store: Store<DomainsState>) {
  }

  ngOnInit(): void {
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
}
