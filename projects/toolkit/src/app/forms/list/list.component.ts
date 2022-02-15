import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Form } from '../models/form.model';
import { FormState } from '../store/reducers/form.reducer';
import * as fromFormActions from '../store/actions/form.actions';
import * as fromFormSelectors from '../store/selectors/form.selectors';
import { Router } from '@angular/router';

export const FORMS: Form[] = [{
  uuid: '1234-456-2344',
  name: 'Campaign Whales Saving',
  description: 'Lets save the whales and oceans',
  organizationUuid: '3345-FCA-5523',
  createdBy: 'chris A',
  createdAt: Date(),
  updatedAt: Date(),
  status: 'Pending',
  submissions: 10,
  content: '<HTML>SOME DATA HERE</HTML>',
},
{
  uuid: '2323-ABD-787874',
  name: 'Survey for school support',
  description: 'Lets save the schools',
  organizationUuid: '7459-CAD-7738',
  createdBy: 'chris B',
  createdAt: Date(),
  updatedAt: Date(),
  status: 'Deleted',
  submissions: 20,
  content: '<HTML>SOME DATA HERE</HTML>',
},
];

@Component({
  selector: 'tool-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  formsList$: Observable<Form[]> = of<Form[]>([]);

  constructor(
    private store: Store<FormState>,
    private router: Router,
  ) { }

  showCreateModal: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(fromFormActions.loadForms());
    this.formsList$ = this.store.pipe(
      select(fromFormSelectors.selectForms),
    );
  }

  createNew() {
    this.showCreateModal = true;
  }

  handleCancel(): void {
    this.showCreateModal = false;
  }

  createNewForm() {
    //this.router.navigate([this.router.url, { outlets: {modal: 'create'} }]);
    //this.router.navigate(['create']);
  }

}
