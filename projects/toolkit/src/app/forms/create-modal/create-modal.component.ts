import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormState } from '../store/reducers/form.reducer';
import * as fromFormActions from '../store/actions/form.actions';
import * as fromFormSelectors from '../store/selectors/form.selectors';
import { UserService } from '../../../../../../src/app/shared/services/user/user.service';
import { BaseComponent } from '../../../../../../src/app/core/base.component';


@Component({
  selector: 'tool-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent extends BaseComponent implements OnInit {
  destroy = new Subject<any>();
  currentDialog = null;
  validateForm!: FormGroup;
  showModal = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<FormState>,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.showModal = true;
    
    this.store.pipe(select(fromFormSelectors.selectInsertedForm)).subscribe(form => {
      if (form) {
        this.router.navigate(['/forms'], { relativeTo: this.route }).finally(() => {
          this.store.dispatch(fromFormActions.clearInsertedForm());
        });
      }
    });

    this.store.pipe(select(fromFormSelectors.formCreationErrors)).subscribe(error => {
      if (error) {
        this.validateForm.controls.formName.setErrors({
          duplicated: error,
        });
      }
    });
    
    this.validateForm = this.fb.group({
      formName: ['', [Validators.required, this.formNameValidator]],
    });
  }

  formNameValidator = (control: FormControl): { [s: string]: boolean } => {
    const regex = /^[-@./#&+\w\s]*$/g;
    if (!control.value) {
      return { error: true, required: true };
    } else if (!control.value.match(regex)) {
      return { notvalid: true, error: true };
    }
    return {};
  };

  handleCancel(): void {
    this.showModal = false;
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.validateForm.controls, key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    this.router.navigate(['/forms'], { relativeTo: this.route });
  }

  handleOk(): void {
    this.store.dispatch(fromFormActions.createForm({
      form: {
        name: this.validateForm.controls.formName.value,
        content: '{}', // Add default content here
        confirmation: '{}', // Add default confirmation here
      },
    }));
  }
}
