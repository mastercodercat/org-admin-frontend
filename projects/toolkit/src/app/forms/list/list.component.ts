import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';

import { Form } from '../models/form.model';
import { FormState } from '../store/reducers/form.reducer';
import * as fromFormActions from '../store/actions/form.actions';
import * as fromFormSelectors from '../store/selectors/form.selectors';

interface ColumnItem {
  name: string;
  width: string | null;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Form> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'tool-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  formsList$ = this.store.select(fromFormSelectors.selectFormsSortedByCreation);
  searchString = '';

  listOfColumns: ColumnItem[] = [
    {
      name: 'Form Details',
      width: null,
      sortOrder: null,
      sortFn: (a: Form, b: Form): number => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      name: 'Status',
      width: '120px',
      sortOrder: null,
      sortFn: (a: Form, b: Form): number => a.status && b.status ? a.status.localeCompare(b.status) : 0,
      sortDirections: ['ascend', 'descend'],
    },
  ];

  showCreateModal = false;

  constructor(private store: Store<FormState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(fromFormActions.loadForms());
  }

  resetSort(): void {
    this.listOfColumns = this.listOfColumns.map( (column: ColumnItem) => {
      column.sortOrder = null;
      return column;
    });
  }

  onSearchChange(value: string): void {
    this.formsList$ = this.store.select(fromFormSelectors.selectFormsSortedByCreation).pipe(
      map( (form: Form[]) => [...form].filter(
        form => form.name.toLowerCase().includes(value.toLowerCase()),
      )),
    );
  }

  createNew(): void {
    this.showCreateModal = true;
  }

  handleCancel(): void {
    this.showCreateModal = false;
  }
}
