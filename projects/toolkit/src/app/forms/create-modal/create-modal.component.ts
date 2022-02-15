import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tool-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent {
  destroy = new Subject<any>();
  currentDialog = null;
  validateForm!: FormGroup;
  showModal = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NzModalService,
  ) {

    route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        // When router navigates on this component is takes the params and opens up the modal
        this.showModal = true;
    });
    this.validateForm = this.fb.group({
      formName: ['', [Validators.required, this.formNameValidator]],
    });
  }

  formNameValidator = (control: FormControl): { [s: string]: boolean } => {
    const regex = /^[-@.\/#&+\w\s]*$/g;
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
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    this.router.navigate(["/forms"], { relativeTo: this.route });
  }

}
