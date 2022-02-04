import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FilterModel, FilterOption } from '../../models/filters.model';
import { FilterState } from '../../stores/filter-store/explorer-filters.reducer';
import * as FilterActions from '../../stores/filter-store/explorer-filters.actions';
import { GeoFilterState } from '../../stores/geo-filter-store/explorer-geo-filter.reducer';
import { geoFilterList } from '../../stores/geo-filter-store/explorer-geo-filter.selectors';
import { MapSelection } from '../us-map/map-selection.model';
import { filterList } from '../../stores/filter-store/explorer-filters.selectors';

interface Filter {
  title: string;
  options: FilterOption[];
  opened?: boolean;
}

@Component({
  selector: 'exp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterBoxComponent implements OnInit, OnDestroy {

  // @ts-ignore
  @Input() mapSelections: MapSelection;
  @Input() set appliedFilters(appliedFilters: any) {
    if (appliedFilters) {
      this.clearFilters();
      // merge both arrays
      appliedFilters.forEach((appliedFilter: any) => {
        this.filters.forEach(categories => {
          categories.options.forEach(option => {
            if (option.label === appliedFilter.label) {
              option.checked = true;
            }
          });
        });
      });
      this.filtersChanged(true);
      this.filterChange.emit(appliedFilters);
    }
  }

  @Output() filterChange = new EventEmitter<FilterOption[]>();
  @Output() toggleGeoFilter = new EventEmitter<any>();

  activeFilters: FilterOption[] = [];
  selectFilters: FilterModel = {id: 'Selected Filters', filters: []};
  geoFilters$: Observable<any> | undefined;
  filters$: Observable<any> | undefined;
  activeGeoFilter: any;
  filtersApplied = true;
  applyBtnActive = true;
  saveBtnActive = true;
  // save community drawer fields
  _isSaveCommunityDrawerVisible = false;
  currentCommunity: any = {};

  filters: Filter[] = [
    {
      title: 'Age',
      options: [
        { label: '18 to 24', value: {selected: [18, 24], property: 'age'}},
        { label: '25 to 34', value: {selected: [25, 34], property: 'age'}},
        { label: '35 to 44', value: {selected: [35, 44], property: 'age'}},
        { label: '45 to 54', value: {selected: [45, 54], property: 'age'}},
        { label: '55 to 64', value: {selected: [55, 64], property: 'age'}},
        { label: '65 Plus', value: {selected: [65, 150], property: 'age'}},
        { label: 'Unknown', value: 'unknown'},
      ],
    },
    {
      title: 'Gender',
      options: [
        { label: 'Male', value: {selected: 'M', property: 'gender'}},
        { label: 'Female', value: {selected: 'F', property: 'gender'}},
        { label: 'Unknown', value: {selected: '', property: 'gender'}},
      ],
    },
    {
      title: 'Marital Status',
      options: [
        { label: 'Married', value: {selected: 'M', property: 'marital'}},
        { label: 'Non-traditional', value: {selected: 'N', property: 'marital'}},
        { label: 'Unknown / Single', value: {selected: '', property: 'marital'}},
      ],
    },
    {
      title: 'Income',
      options: [
        { label: '< 30k', value: {selected: [0, 30000], property: 'hh_income'}},
        { label: '30 - 50k', value: {selected: [30000, 50000], property: 'hh_income'}},
        { label: '50 - 75k', value: {selected: [50000, 75000], property: 'hh_income'}},
        { label: '75 - 125k', value: {selected: [75000, 125000], property: 'hh_income'}},
        { label: '125k+', value: {selected: [125000, 999999999999999], property: 'hh_income'}},
      ],
    },
    {
      title: 'Education',
      options: [
        { label: 'No High School', value: {selected: 'L', property: 'education'}},
        { label: 'High School', value: {selected: 'H', property: 'education'}},
        { label: 'Some College', value: {selected: 'S', property: 'education'}},
        { label: 'Bachelors', value: {selected: 'B', property: 'education'}},
        { label: 'Graduate', value: {selected: 'G', property: 'education'}},
      ],
    },
    {
      title: 'Voted',
      options: [
        { label: '2020 Primary', value: {selected: 'VOTE_P_2020', property: 'voted'}},
        { label: '2018 General', value: {selected: 'VOTE_G_2018', property: 'voted'}},
        { label: '2016 General', value: {selected: 'VOTE_G_2016', property: 'voted'}},
        { label: '2016 Primary', value: {selected: 'VOTE_P_2016', property: 'voted'}},
        { label: '2014 General', value: {selected: 'VOTE_G_2014', property: 'voted'}},
        { label: '2012 General', value: {selected: 'VOTE_G_2012', property: 'voted'}},
        { label: '2012 Primary', value: {selected: 'VOTE_P_2012', property: 'voted'}},
      ],
    },
    {
      title: 'Donated to',
      options: [
        { label: 'Causes', value: {selected: 'DONOR_TO_CAUSES', property: 'donor'}},
        { label: 'Conservative', value: {selected: 'DONOR_TO_CONSERVATIVE', property: 'donor'}},
        { label: 'Liberal', value: {selected: 'DONOR_TO_LIBERAL', property: 'donor'}},
      ],
    },
    {
      title: 'Party',
      options: [
        { label: 'Republican', value: {selected: 'R', property: 'party'}},
        { label: 'Democratic', value: {selected: 'D', property: 'party'}},
        { label: 'Independent', value: {selected: 'I', property: 'party'}},
      ],
    },
    {
      title: 'Civic Score',
      options: [
        { label: 'Most Engaged', value: {selected: 'A', property: 'civic_score'}},
        { label: 'Actively Engaged', value: {selected: 'B', property: 'civic_score'}},
        { label: 'Passively Engaged', value: {selected: 'C', property: 'civic_score'}},
        { label: 'Occasionally Engaged', value: {selected: 'D', property: 'civic_score'}},
        { label: 'Least Engaged', value: {selected: 'E', property: 'civic_score'}},
      ],
    },
  ];

  private unsubscribe: Subject<void> = new Subject();

  constructor(private filterStore: Store<FilterState>, private geoFilterStore: Store<GeoFilterState>) { }

  ngOnInit(): void {
    this.geoFilters$ = this.geoFilterStore.pipe(select(geoFilterList));
    this.geoFilters$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.activeGeoFilter = res?.geoFilters?.geoFilters;
      if (res?.geoFilters?.geoFilters?.geoFilters?.length > 0) {
        this.activeGeoFilter = res.geoFilters.geoFilters.geoFilters;
      } else if (res?.geoFilters?.geoFilters?.geoFilters?.length === 0 && res?.geoFilters?.geoFilters?.name) {
        this.activeGeoFilter = ['1'];
      } else {
        this.activeGeoFilter = undefined;
      }
    });
    this.filters$ = this.filterStore.pipe(select(filterList));
    this.filters$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      if (res?.applyFilters?.applyFilters) {
        this.filtersChanged();
        this.filterStore.dispatch(FilterActions.filterExplorerApplyFilters({applyFilters: false}));
      }
      if (res?.communitySelected?.communitySelected) {
        this.applyBtnActive = true;
      }
      if (res?.saveButtonActive) {
        this.saveBtnActive = res.saveButtonActive.saveButtonActive;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  activeFilterOptions(filter: Filter): any[] {
    return filter.options.filter(option => option.checked);
  }

  filtersChanged(softChange?: boolean): void {
    const activeFilters: FilterOption[] = [];

    this.filters.forEach(filter => {
      const activeFilterOptions = this.activeFilterOptions(filter);
      if (activeFilterOptions.length) {
        Array.prototype.push.apply(activeFilters, activeFilterOptions);
      }
    });
    this.filtersApplied = activeFilters.length > 0 ? false : true;
    this.applyBtnActive = this.diffForApply(activeFilters, this.activeFilters);
    if (!softChange) {
      this.activeFilters = activeFilters;
      this.selectFilters.filters = JSON.parse(JSON.stringify(activeFilters));
      this.filterStore.dispatch(FilterActions.filterExplorerApplied(this.selectFilters));
      this.filterStore.dispatch(FilterActions.filterExplorerApplyButtonClicked({applyButtonClicked: true}));
      this.filterStore.dispatch(FilterActions.filterExplorerSaveCommunityActive({saveButtonActive: false}));
      this.filterChange.emit(activeFilters);
      this.applyBtnActive = true;
    }
    this.filterStore.dispatch(FilterActions.filterExplorerSelected({selected: !this.applyBtnActive}));
  }

  deselectAll(title: string): void {
    for (const a of this.filters) {
      if (a.title === title) {
        for (const b of a.options) {
          b.checked = false;
        }
      }
    }
    this.filtersChanged();
  }
  selectAll(title: string): void {
    for (const a of this.filters) {
      if (a.title === title) {
        for (const b of a.options) {
          b.checked = true;
        }
      }
    }
    this.filtersChanged();
  }
  toggleFilterPanel(): void {
    this.toggleGeoFilter.emit();
  }
  clearFilters(): void{
    for (const a of this.filters) {
      for (const b of a.options) {
        b.checked = false;
      }
    }
    this.filtersChanged();
    this.filterStore.dispatch(FilterActions.filterExplorerSaveCommunityActive({saveButtonActive: true}));
  }
  diffForApply(futureFilter: any[], pastFilter: any[]): boolean {
    const result = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < futureFilter.length; i++) {
      if (pastFilter.indexOf(futureFilter[i]) === -1) {
        result.push(futureFilter[i]);
      }
    }
    if (result.length === 0 && futureFilter.length === 0 && pastFilter.length > 0) {
      result.push('true');
    }
    if (result.length === 0 && futureFilter.length !== pastFilter.length) {
      result.push('true');
    }
    return result.length > 0 ? false : true;
  }

  get isSaveCommunityDrawerVisible(): boolean {
    return this._isSaveCommunityDrawerVisible;
  }

  set isSaveCommunityDrawerVisible(visible: boolean) {
    this._isSaveCommunityDrawerVisible = visible;
  }

  openSaveDrawer(community: any): void {
    this.currentCommunity = {};
    this.isSaveCommunityDrawerVisible = true;
  }

}
