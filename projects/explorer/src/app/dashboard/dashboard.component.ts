import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subscription, Subject } from 'rxjs';

import { MapSelection } from '../shared/components/us-map/map-selection.model';
import { SearchBoxComponent } from '../shared/components/search-box/search-box.component';
import { MapService } from '../shared/services/map.service';
import { ChartsService } from '../shared/services/charts.service';
import { MixpanelService } from '../shared/services/mixpanel.service';
import { TreeRegion } from '../shared/components/geo-filters-drawer/tree-region.model';
import { filterList } from '../shared/stores/filter-store/explorer-filters.selectors';
import { FilterState } from '../shared/stores/filter-store/explorer-filters.reducer';
import * as FilterActions from '../shared/stores/filter-store/explorer-filters.actions';

@Component({
  selector: 'exp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild(SearchBoxComponent) searchBox: SearchBoxComponent | undefined;

  households?: number;
  people?: number;
  name?: string;
  score?: number;
  state = '';
  updateBarChart = false;
  barCharts: any = [];
  zoomInMap?: MapSelection = undefined;
  setNationalValues: any;
  selectedChartFilters: any = null;
  stringifiedChartFilters: string | null = null;
  mapSelections: any;
  selectionChangeRequest: Subscription | undefined;
  callInProgress = false;
  rotationCount = 0;
  visible = false;
  displaySidepanel = false;
  selectInMap: TreeRegion[] = [];
  setNewMapWidth = 0;
  sizeCharts = true;
  mapSelectionDropdown = 'States';
  disableForSearch = false;
  nationalSelectedCounty: string | undefined = '';
  filterSelectedButNotApplied = false;
  filtersHaveBeenApplied = false;
  communityUpdateApplied = false;
  compareSelectedValue = 'None';
  compareSelectedDisabled = true;
  compareSelectedArray: string[] = [];
  compareBreadCrumbs: string[] = [];
  filtersApplied: any;
  filters$: Observable<any> | undefined;
  appliedFilters: any;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private mapService: MapService,
    private chartsService: ChartsService,
    private mixpanel: MixpanelService,
    private filterStore: Store<FilterState>,
  ) { }

  ngOnInit(): void {
    this.filters$ = this.filterStore.pipe(select(filterList));
    this.filters$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.filterSelectedButNotApplied = res?.selected?.selected;
      this.filtersApplied = res.filters;
      if (res?.applyButtonClicked?.applyButtonClicked) {
        this.applyFiltersButtonClicked();
      }
      if (res?.communityUpdated?.communityUpdated) {
        this.communityUpdateApplied = true;
        setTimeout(() => {
          this.filterStore.dispatch(FilterActions.filterExplorerCommunityUpdated({communityUpdated: false}));
          this.communityUpdateApplied = false;
        }, 5000);
      }
      if (res?.communitySelected?.communitySelected) {
        setTimeout(() => {
          this.filterStore.dispatch(FilterActions.savedCommunitySelected({communitySelected: false}));
          this.filterSelectedButNotApplied = false;
        }, 100);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  communityLoaded(community: any): void {
    if (community.geoFilters?.length) {
      community.geoFilters[0].communityName = community.name;
      // community.geoFilters[0].name = community.name;
      this.regionsSelected(community.geoFilters);
    } else {
      if (community.selections && community.selections.segment) {
        this.regionsSelected([{
          key: community.selections.id,
          type: community.selections.level,
          name: community.selections.name,
          level: (community.selections.level === 'state' ? 0 : 1),
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          parentCode: 'US' + (community.selections.segment?.state ? '-' + community.selections.segment?.state : ''),
          communityName: community.name,
        }]);
      } else {
        // Whole US map (no geographies applied)
        // this.usstatesmap?.resetMap();
        this.mapReset();
      }
    }
    // Automatically select filters
    this.appliedFilters = community.criteriaFilters;

    // Update charts
    this.filtersChanged(community.criteriaFilters);
  }

  toggleSidebar(opened: boolean): void {
    this.sizeCharts = !this.sizeCharts;
    this.displaySidepanel = opened;
    setTimeout(() => { this.setNewMapWidth = opened ? 450 : 0; }, 100);
  }

  searchChange(searchResult?: MapSelection): void {
    this.disableForSearch = true;
    let countySelection = {};
    if (searchResult?.category === 'state') {
      countySelection = {
        id: searchResult?.id,
        people: 0,
        name: searchResult?.meta.stateName,
        level: 0,
        segment: [{state: 'AL', county: '005'}],
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        key: `US-${searchResult?.id}`,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        parentCode: `US-${searchResult?.id}`,
        search: true,
      };
    } else if (searchResult?.category === 'postcode') {
      this.mapSelectionDropdown = 'Zipcodes';
      countySelection = {
        id: searchResult?.id,
        people: 0,
        name: searchResult?.meta.state,
        level: 2,
        search: true,
      };
      // @ts-ignore
      // eslint-disable-next-line max-len
      this.mapSelectionChange({level: 'postcode', segment: {state: searchResult?.meta.state, postcode: searchResult?.meta.label}, people: 1, name: searchResult?.id});
    } else {
      this.mapSelectionDropdown = 'Counties';
      countySelection = {
        id: searchResult?.id,
        people: 0,
        name: searchResult?.meta.label,
        level: 1,
        segment: [{state: 'AL', county: '005'}],
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        key: `US-${searchResult?.meta.state}-${searchResult?.meta.id}`,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        parentCode: `US-${searchResult?.meta.state}`,
        search: true,
      };
    }
    this.regionsSelected([countySelection]);
  }

  mapReset(): void {
    this.searchBox?.cleanSearch();
    this.mapSelectionChange(this.setNationalValues);
  }

  regionsSelected(selections: any[]): void {
    if (selections[0].type === 'county') {
      this.disableForSearch = true;
      this.mapSelectionDropdown = 'Counties';
    } else if (selections[0].type === 'postcode') {
      this.disableForSearch = true;
      this.mapSelectionDropdown = 'Zipcodes';
    } else if (selections[0].type === 'congress') {
      this.disableForSearch = true;
      this.mapSelectionDropdown = 'Congressional Districts';
    }
    this.selectInMap = Object.assign([], selections);
  }

  mapSelectionChange(selections: MapSelection): void {
    this.setCompareSelectedArray(selections);
    if (selections && selections.level === 'state') {
      this.mapSelectionDropdown = 'Counties';
    } else if (selections && selections.id === 'US' && this.mapSelectionDropdown !== 'National Counties') {
      this.mapSelectionDropdown = 'States';
    }
    if (this.callInProgress) {
      this.selectionChangeRequest?.unsubscribe();
    } else {
      this.callInProgress = true;
    }
    this.barCharts = [];
    // This code is to make the old national county map selections work
    // Start
    if (selections && selections.mapType === 'nationalCountyMap') {
      if (this.nationalSelectedCounty === selections.id) {
        // Charts go back to national
        selections.id = 'US';
        this.nationalSelectedCounty = '';
      } else {
        // Charts go to new county
        this.nationalSelectedCounty = selections.id;
        const splitId = selections.id?.split('-');
        // @ts-ignore
        selections.segment = { state: splitId[1], county: splitId[2] };
        selections.level = 'county';
      }
    }
    // End
    if (selections && selections.people && selections.id !== 'US' && selections.name !== 'US') {
      this.selectionChangeRequest = this.mapService.getAllChartData(selections.segment, selections.level, this.stringifiedChartFilters)
        .subscribe(res => {
          this.callInProgress = false;
          if (res?.data.county[0]) {
            this.mapSelections = this.chartsService.selectionObjectConstruction(res?.data.county[0]);
            this.mapSelections.name = selections.name;
          }
          this.addChartData(this.mapSelections);
          if (selections.level === 'state') {
            this.filterStore.dispatch(FilterActions.stateChartsData({stateChart: {state: this.mapSelections.segment, data: this.mapSelections}}));
          }
        });
    } else {
      this.disableForSearch = false;
      this.mapSelections = {};
      this.selectionChangeRequest = this.mapService.getAllChartDataNational(this.stringifiedChartFilters).subscribe(res => {
        this.callInProgress = false;
        if (res?.data.county[0]) {
          this.mapSelections = this.chartsService.selectionObjectConstruction(res?.data.county[0]);
          this.mapSelections.name = res?.data.county[0].segment;
        }
        this.addChartData(this.mapSelections);
      });
    }
  }

  setNational($event: any): void {
    this.setNationalValues = $event[0];
    this.mapSelectionChange(this.setNationalValues);
  }
  addChartData(selection: {
    households?: any; people?: any; name?: any; score?: any; age?: any; degree?: any;
    income?: any; marital?: any; gender?: any; category?: any; valueUpdated?: any; id?: any; state?: any;
  }): void {
    this.households = selection?.households;
    this.people = selection?.people;
    if (selection?.state) {
      this.state = selection.state;
    } else {
      this.state = '';
    }
    this.name = selection?.name;
    if (selection?.valueUpdated) {
      this.score = Math.round(((Number(selection?.score) + Number.EPSILON) * 100) / 10);
    } else {
      this.score = Math.round((Number(selection?.score) + Number.EPSILON) * 100);
    }
    if (selection !== undefined) {
      this.barCharts = this.chartsService.barChartData(selection);
      // using below for compare charts
      if (selection.name === 'US') {
        this.filterStore.dispatch(FilterActions.usChartsData({usChart: this.barCharts}));
      }
    }
    this.updateBarChart = true;
  }

  filtersChanged(event: any): void {
    this.stringifiedChartFilters = null;
    this.selectedChartFilters = {
      age: [],
      gender: [],
      marital: [],
      hh_income: [],
      degree: [],
      party: [],
      civic_score_general_category: [],
    };
    for (const filterValues of event) {
      if (filterValues.value.property === 'age') {
        this.selectedChartFilters.age.push(filterValues.value.selected);
      } else if (filterValues.value.property === 'gender') {
        this.selectedChartFilters.gender.push(filterValues.value.selected);
      } else if (filterValues.value.property === 'marital') {
        this.selectedChartFilters.marital.push(filterValues.value.selected);
      } else if (filterValues.value.property === 'hh_income') {
        this.selectedChartFilters.hh_income.push(filterValues.value.selected);
      } else if (filterValues.value.property === 'education') {
        this.selectedChartFilters.degree.push(filterValues.value.selected);
      } else if (filterValues.value.property === 'voted') {
        this.selectedChartFilters[filterValues.value.selected] = [1];
      } else if (filterValues.value.property === 'donor') {
        this.selectedChartFilters[filterValues.value.selected] = [1];
      } else if (filterValues.value.property === 'party') {
        this.selectedChartFilters.party.push(filterValues.value.selected);
      } else if (filterValues.value.property === 'civic_score') {
        this.selectedChartFilters.civic_score_general_category.push(filterValues.value.selected);
      }
      this.stringifiedChartFilters = JSON.stringify(this.selectedChartFilters);
      this.filterStore.dispatch(FilterActions.filterStringifiedFilters({stringifiedFilters: this.stringifiedChartFilters}));
    }
    // this.mixpanel.setPeople({filters: this.selectedChartFilters});
    this.callForFilterChange(this.mapSelections);
  }

  callForFilterChange(m: any): void {
    ++this.rotationCount;
    if (!this.callInProgress) {
      this.mapSelectionChange(m);
      this.rotationCount = 0;
    } else {
      const abortController = new AbortController();
      abortController.abort();
      // @ts-ignore
      this.selectionChangeRequest.unsubscribe();
      this.mapSelectionChange(m);
    }
  }

  resetForNationalCounties(e: any): void {
    if (e === 'National Counties'){
      this.selectInMap = [];
      this.mapReset();
    }
  }

  applyFilters(): void {
    this.filterStore.dispatch(FilterActions.filterExplorerApplyFilters({applyFilters: true}));
  }

  applyFiltersButtonClicked(): void {
    this.filtersHaveBeenApplied = true;
    setTimeout(() => {
      this.filtersHaveBeenApplied = false;
    }, 5000);
  }

  setCompareSelectedArray(selection: any): void {
    if (this.compareBreadCrumbs?.length < 3) {
      if (selection.id !== 'Custom Community') {
        this.compareBreadCrumbs.push(selection.name);
      }
    }
    if (selection.name === 'US') {
      this.compareBreadCrumbs = ['U.S. Nationwide'];
      this.compareSelectedArray = ['U.S. Nationwide'];
      this.compareSelectedDisabled = this.filtersApplied?.length > 0? false : true;
      this.compareSelectedValue = 'None';
    } else if (this.compareBreadCrumbs?.length === 2){
      this.compareSelectedDisabled = false;
    } else if (this.compareBreadCrumbs?.length === 3 && this.compareSelectedArray.length < 3) {
      if (this.compareBreadCrumbs[1]) {
        this.compareSelectedArray.push(this.compareBreadCrumbs[1]);
      }
      this.compareSelectedDisabled = false;
    }
    if (this.filtersApplied?.length > 0) {
      this.compareSelectedArray = JSON.parse(JSON.stringify(this.compareBreadCrumbs));
      this.compareSelectedDisabled = false;
    } else if (this.filtersApplied?.length === 0) {
      this.compareSelectedArray.splice(2, 1);
    }
  }

  compareHasChanged(): void {
    this.filterStore.dispatch(FilterActions.compareDropdown({compareDropdown: this.compareSelectedValue}));
  }
}
