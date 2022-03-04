import { Component } from '@angular/core';
import { NzUploadXHRArgs, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'org-admin-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  isVisible = false;
  current = 0;
  percent = 0;
  status = 'before';
  data = [
    {
      include: true,
      source: 'Firstname',
      destination: 'First name',
      data_type: 'string',
      sample: 'Jane',
    },
    {
      include: true,
      source: 'Lastname',
      destination: 'Last name',
      data_type: 'string',
      sample: 'Smith',
    },
    {
      include: true,
      source: 'State',
      destination: 'State',
      data_type: 'string',
      sample: 'Maine',
    },
    {
      include: false,
      source: 'Email Address',
      destination: 'Email',
      data_type: 'string',
      sample: 'js@maine.gov',
    },
    {
      include: false,
      source: 'Favorite Cookie',
      destination: 'No Match',
      data_type: 'string',
      sample: 'snickerdoodle',
    },
  ];

  constructor(private http: HttpClient) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.current = 0;
    this.isVisible = false;
  }

  handleNext(): void {
    this.current += 1;
  }

  handleUpload(item: NzUploadXHRArgs): Subscription {
    const formData = new FormData();
    formData.append('file', item.postFile as Blob); // tslint:disable-next-line:no-any
    const req = new HttpRequest('POST', item.action || '', formData, {
      reportProgress : true,
      withCredentials: false,
    });
    // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
    const subscription = this.http.request(req).subscribe((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total && event.total > 0) {
          this.percent = event.loaded / event.total * 100;
          (event as any).percent = this.percent; // tslint:disable-next-line:no-any
        }
        // To process the upload progress bar, you must specify the `percent` attribute to indicate progress.
        if (item.onProgress) {
          item.onProgress(event, item.file);
        }
      } else if (event instanceof HttpResponse) { /* success */
        if (item.onSuccess) {
          item.onSuccess(event.body, item.file, event);
        }
      }
    },(err: Error) => { /* error */
      if (item.onError) {
        item.onError(err, item.file);
      }
    });

    return subscription;
  }

  handleChange({ event, type }: NzUploadChangeParam): void {
    console.log(event, type);
    this.status = type || 'before';
    if (type === 'progress') {
      this.percent = Math.ceil(event?.percent || 0);
    }
  }
}
