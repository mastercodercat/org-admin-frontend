import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { Organization } from '../../../../shared/models/organization.model';
import { UserState } from '../../../../store/reducers/user.reducer';
import * as fromUserSelectors from '../../../../store/selectors/user.selectors';
@Component({
  selector: 'org-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.less'],
})
export class InviteMembersComponent implements OnInit {
  @Output() submitEmails = new EventEmitter();
  emailForm!: FormGroup;
  currOrgInfo$: Observable<Organization | undefined>;

  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>) {
    this.currOrgInfo$ = this.store.pipe(select(fromUserSelectors.selectCurrentOrganization));
  }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      emails: [null, [Validators.required]],
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const myReader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    myReader.readAsText(file as any);
    myReader.onloadend = (e: ProgressEvent<FileReader>): void => {
      const result = e?.target?.result as string;
      this.submitEmails.emit(result.split('\r\n'));
    };
    return false;
  };

  submitForm(): void {
    const emails = this.emailForm.controls.emails.value as string;

    for (const i in this.emailForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.emailForm.controls, i)) {
        this.emailForm.controls[i].markAsDirty();
        this.emailForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.emailForm.controls.emails.value) {
      this.submitEmails.emit(emails.split(','));
    }
  }
}
