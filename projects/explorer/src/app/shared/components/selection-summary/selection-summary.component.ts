import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';

import { MapSelection } from '../us-map/map-selection.model';
import * as FilterActions from '../../stores/filter-store/explorer-filters.actions';
import { filterList } from '../../stores/filter-store/explorer-filters.selectors';
import { FilterState } from '../../stores/filter-store/explorer-filters.reducer';


@Component({
  selector: 'exp-selection-summary',
  templateUrl: './selection-summary.component.html',
  styleUrls: ['./selection-summary.component.scss'],
})
export class SelectionSummaryComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @Input() mapSelections: MapSelection;
  @Input() appliedFilters: any;
  @Output() filterChange = new EventEmitter<any>();
  @Output() toggleGeoFilter = new EventEmitter<any>();

  @Input() households = 0;
  @Input() people = 0;
  @Input() name = 'Nationwide';
  @Input() score = 0;
  @Input() state = '';

  isFiltersApplied = false;
  unsavedChangesTag = false;
  savedChangesTag = false;
  filters$: Observable<any> | undefined;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private filterStore: Store<FilterState>) { }

  ngOnInit(): void {
    this.filters$ = this.filterStore.pipe(select(filterList));
    this.filters$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      if (res) {
        if (res?.saveButtonActive) {
          this.unsavedChangesTag = !res.saveButtonActive.saveButtonActive;
        }
        this.savedChangesTag = res?.saveButtonClicked?.saveButtonClicked;
        if (res?.saveButtonClicked?.saveButtonClicked) {
          this.unsavedChangesTag = false;
          setTimeout(() => {
            this.filterStore.dispatch(FilterActions.filterExplorerSaveCommunityClicked({saveButtonClicked: false}));
          }, 5000);
        }
        if (res?.communitySelected?.communitySelected) {
          setTimeout(() => {
            this.isFiltersApplied = false;
          }, 200);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  filtersChanged(event: any): void {
    this.isFiltersApplied = event?.length;
    this.filterChange.emit(event);
  }
  toggleFilterPanel(): void {
    this.toggleGeoFilter.emit();
  }
}
