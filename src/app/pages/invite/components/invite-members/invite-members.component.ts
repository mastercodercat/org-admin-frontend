import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'org-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.less']
})
export class InviteMembersComponent implements OnInit {
  @Output() submitEmails = new EventEmitter();
  emailForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      emails: [null, [Validators.required]]
    });
  }

  beforeUpload = (file: NzUploadFile) => {
    const myReader = new FileReader();
    myReader.readAsText(file as any);
    myReader.onloadend = (e) => {
      const result = e?.target?.result as string;
      this.submitEmails.emit(result.split('\r\n'));
    };
    return false;
  }

  submitForm() {
    const emails = this.emailForm.controls['emails'].value;

    for (const i in this.emailForm.controls) {
      if (this.emailForm.controls.hasOwnProperty(i)) {
        this.emailForm.controls[i].markAsDirty();
        this.emailForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.emailForm.controls['emails'].value) {
      this.submitEmails.emit(emails.split(','));
    }
  }
}
