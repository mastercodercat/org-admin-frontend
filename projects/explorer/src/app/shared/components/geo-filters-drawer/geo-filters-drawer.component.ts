import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { StateModel } from '../../models/states.model';
import { statesList } from '../../stores/state-store/explorer.selector';
import { ExplorerState } from '../../stores/state-store/explorer.reducer';
import { MapService } from '../../services/map.service';
import { TreeRegion } from './tree-region.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GeoFilterState } from '../../stores/geo-filter-store/explorer-geo-filter.reducer';
import * as GeoFilterActions from '../../stores/geo-filter-store/explorer-geo-filter.actions';
import { geoFilterList } from '../../stores/geo-filter-store/explorer-geo-filter.selectors';
import { FilterState } from '../../stores/filter-store/explorer-filters.reducer';
import * as FilterActions from '../../stores/filter-store/explorer-filters.actions';

@Component({
  selector: 'exp-geo-filters-drawer',
  templateUrl: './geo-filters-drawer.component.html',
  styleUrls: ['./geo-filters-drawer.component.scss'],
})
export class GeoFiltersDrawerComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  @Output() regionsSelected = new EventEmitter<TreeRegion[]>();
  @Input() set remoteOpenPanel(panel: any) {
    this.displaySidepanel = panel;
  }
  displaySidepanel = false;
  nodes: TreeRegion[] = [];
  searchValue = '';
  selectedNodes: TreeRegion[] = [];
  layer = 'county';
  states$: Observable<StateModel[]> | undefined;
  geoFilters$: Observable<any> | undefined;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private mapService: MapService,
    private store: Store<ExplorerState>,
    private modal: NzModalService,
    private geoFilter: Store<GeoFilterState>,
    private filterStore: Store<FilterState>,
  ) { }

  ngOnInit(): void {
    this.states$ = this.store.pipe(select(statesList));
    this.states$.pipe(takeUntil(this.unsubscribe)).subscribe(listOfStates => {
      const selectTree: any = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      listOfStates.sort((state1: any, state2: any) => state1.name.localeCompare(state2.name)).forEach((state: any) => {
        const stateNode: TreeRegion = {
          key: state.id,
          name: state.name,
          people: state.people,
          households: state.households,
          showExpand: true,
          level: 0,
          expanded: false,
          children: [],
          isSelected: this.selectedNodes.some(node => node.key === state.id),
          isDisabled: false,
        };

        if (state.counties) {
          state.counties.each((c: any) => {
            this.parseCounties(c, stateNode);
          });
        }

        selectTree.push(stateNode);
      });
      this.nodes = selectTree;
    });
    this.geoFilters$ = this.geoFilter.pipe(select(geoFilterList));
    this.geoFilters$.pipe(takeUntil(this.unsubscribe)).subscribe( filter => {
      if (filter?.geoFiltersSaved?.geoFiltersSaved) {
        this.clearSelections(true);
        this.loadSavedIntoGeofilter(this.loadSavedIntoGeofilterWorker(filter.geoFiltersSaved));
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  nameCompare(a: TreeRegion, b: TreeRegion): any {
    return a.name.localeCompare(b.name);
  }

  numberCompare(prop: string): any {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return (a: TreeRegion, b: TreeRegion) => a[prop] - b[prop];
  }

  changeLayer(layer: string): void {
    if (this.selectedNodes.length) {
      this.modal.confirm({
        nzTitle: 'Warning',
        nzContent: 'Changing to a different geographical level will remove any '
          + 'current geographical filter selections. Would you like to continue?',
        nzOnOk: () => this.clearSelections(),
      });
    } else {
      this.clearSelections();
    }
  }

  collapse(row: TreeRegion, expand: boolean): void {
    row.expanded = expand;
    if (expand) {
      // Expand
      if (!row?.children?.length) {
        row.loading = true;
        this.mapService.getCountyData(this.layer, row.key.replace('US-', '')).subscribe(res => {
          row.children = [];

          res?.data?.county?.forEach((county: any) => {
            this.parseCounties(county, row);
          });
          this.selectChildrenIfParentSelected(row);
          row.loading = false;
        });
      } else {
        this.selectChildrenIfParentSelected(row);
      }
    } else {
      // Collapse
      if (row.children) {
        row.children.forEach(d => {
          this.collapse(d, false);
        });
      }
    }
  }

  selectChildrenIfParentSelected(row: TreeRegion): void {
    // If parent row is selected, and it's the only selected row, select all children
    const anyOtherStateSelected = this.nodes.some(state => state.isSelected && state.key !== row.key);
    if (row.isSelected && !anyOtherStateSelected) {
      row.isSelected = false;
      this.selectAllChildren(row);
      this.updateSelectedNodes();
    }
  }

  selectAllChildren(node: TreeRegion): void {
    node.children?.forEach(child => {
      child.isDisabled = false;
      this.selectNode(child, true);
    });
  }

  toggleSidepanel(): void {
    this.displaySidepanel = !this.displaySidepanel;
    this.toggleSidebar.emit(this.displaySidepanel);
  }

  selectNode(row: TreeRegion, force: boolean = false): void {
    if (row.isDisabled && !force) { return; }
    row.isSelected = !row.isSelected;

    const anyStateSelected = this.nodes.some(state => state.isSelected);
    const anyCountySelected = this.nodes.some(state => state.children?.some(county => county.isSelected));

    // Disable counties from another state and other states
    this.nodes.forEach(node => {
      // Clicked on a county
      if (row.parentCode) {
        if (node.key !== row.parentCode) {
          // Disable other states
          node.isDisabled = !!anyCountySelected;
          node.children?.forEach(county => county.isDisabled = !!anyCountySelected);
        }
      } else {
        node.children?.forEach(county => {
          county.isDisabled = !!anyStateSelected;
          // I'm selecting a state => disable counties
          county.isSelected = false;
        });

        if (node.expanded) {
          this.selectChildrenIfParentSelected(node);
        }

        if (!row.expanded && row.isSelected) {
          // It means I clicked on a state that is not expanded, so I should enable other nodes
          this.nodes.forEach(node => node.isDisabled = false);
        }
      }
    });

    this.updateSelectedNodes();
  }

  updateSelectedNodes(): void {
    this.selectedNodes = this.nodes.filter((node: TreeRegion) => node.isSelected);

    // Check if we have selected counties only if we don't have states
    if (!this.selectedNodes.length) {
      this.nodes.forEach(node => {
        if (node.children?.length) {
          this.selectedNodes.push(...node.children.filter((node: TreeRegion) => node.isSelected));
        }
      });
    }
  }

  buildCommunity(): void {
    this.geoFilter.dispatch(GeoFilterActions.geoFilterExplorerApplied({geoFilters: this.selectedNodes}));
    this.filterStore.dispatch(FilterActions.filterExplorerSaveCommunityActive({saveButtonActive: false}));
    this.regionsSelected.emit(this.selectedNodes);
    this.toggleSidepanel();
  }

  clearSelections(communitiesReset?: boolean): void {
    this.nodes.forEach(node => {
      node.isSelected = false;
      node.isDisabled = false;
      if (!communitiesReset) {
        node.expanded = false;
        node.children = undefined;
      }
    });
    this.updateSelectedNodes();
  }

  deselectNode(node: TreeRegion): void {
    node.isSelected = false;
  }

  loadSavedIntoGeofilter(state: any): void {
    let setNodeRowNum = -1;
    if (state[0]?.parentCode) {
      this.mapService.getCountyData(this.layer, state[0].parentCode.replace('US-', '')).subscribe(res => {
        for (let a = 0; a < this.nodes.length; a++) {
          if (state[0].parentCode === this.nodes[a].key) {
            setNodeRowNum = a;
          }
        }
        res?.data?.county?.forEach((county: any) => {
          const countyNode = {
            key: county.segment,
            name: county.county || county.congress || county.postcode,
            people: county.totals.people,
            households: county.totals.households,
            showExpand: false,
            level: 1,
            expanded: true,
            isSelected: false,
            isDisabled: false,
            parentCode: this.nodes[setNodeRowNum].key,
            type: this.layer,
          };
          for (const b of state) {
            if (b.key === countyNode.key) {
              countyNode.isSelected = true;
            }
          }
          this.nodes[setNodeRowNum].children?.push(countyNode);
        });
        this.nodes[setNodeRowNum].expanded = true;
        this.updateSelectedNodes();
      });
    } else {
      for (const a of state) {
        for (const b of this.nodes) {
          if (a.key === b.key) {
            b.isSelected = true;
          }
        }
      }
      this.updateSelectedNodes();
    }
    this.geoFilter.dispatch(GeoFilterActions.geoFilterExplorerSaved({geoFiltersSaved: null}));
  }

  loadSavedIntoGeofilterWorker(filter: any): any[] {
    const finalArray: any = [];
    let finalObj = {
      key: null,
      parentCode: null,
    };
    if (filter.geoFiltersSaved?.geoFilters?.length === 0) {
      if (filter.geoFiltersSaved.selections.level === 'county') {
        finalObj.parentCode = filter.geoFiltersSaved.selections.id.substring(0, 5);
        finalObj.key = filter.geoFiltersSaved.selections.id;
      } else {
        finalObj.key = filter.geoFiltersSaved.selections.id;
      }
      finalArray.push(finalObj);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return finalArray;
    } else {
      for (const a of filter.geoFiltersSaved.geoFilters) {
        if (a.level === 0) {
          finalObj = {key: a.key, parentCode: null};
          finalArray.push(finalObj);
        } else {
          finalObj = {key: a.key, parentCode: a.parentCode};
          finalArray.push(finalObj);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return finalArray;
    }
  }

  private parseCounties(county: any, stateNode: TreeRegion, selected: boolean = false): void {
    const anyStateSelected = this.nodes.some(state => state.isSelected);
    const anyCountySelectedFromOtherState = this.nodes.some(
      state => state.children?.some(county => county.isSelected && county.parentCode !== stateNode.key),
    );
    const countyNode = {
      key: county.segment,
      name: county.county || county.congress || county.postcode,
      people: county.totals.people,
      households: county.totals.households,
      showExpand: false,
      level: 1,
      expanded: true,
      isSelected: selected,
      isDisabled: !!anyStateSelected || !!anyCountySelectedFromOtherState,
      parentCode: stateNode.key,
      type: this.layer,
    };

    // Add Congressional District if it's CD
    if (this.layer === 'congress') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      countyNode.name = `Congressional District ${countyNode.name}`;
    }
    if (stateNode.children) {
      stateNode.children.push(countyNode);
    }
  }
}
