import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommunitiesService } from '../../services/communities.service';
import { FilterState } from '../../stores/filter-store/explorer-filters.reducer';
import * as FilterActions from '../../stores/filter-store/explorer-filters.actions';
import { GeoFilterState } from '../../stores/geo-filter-store/explorer-geo-filter.reducer';
import * as GeoFilterActions from '../../stores/geo-filter-store/explorer-geo-filter.actions';
import {geoFilterExplorerApplied, geoFilterExplorerSaved} from '../../stores/geo-filter-store/explorer-geo-filter.actions';

@Component({
  selector: 'exp-my-communities-drawer',
  templateUrl: './my-communities-drawer.component.html',
  styleUrls: ['./my-communities-drawer.component.scss'],
})
export class MyCommunitiesDrawerComponent {
  @Input() set remoteOpenPanel(panel: boolean) {
    this.visible = panel;
  }

  @Output() communityLoaded = new EventEmitter<any>();

  communities: any[] = [];
  visible = false;
  currentCommunity = null;
  isLoading = false;

  _isSaveCommunityDrawerVisible = false;

  constructor(
    private communitiesService: CommunitiesService,
    private modal: NzModalService,
    private filterStore: Store<FilterState>,
    private geoFilter: Store<GeoFilterState>,
  ) { }

  open(): void {
    this.visible = true;
    this.getCommunities();
  }

  close(): void {
    this.visible = false;
  }

  deleteCommunity(community: any): void {
    this.modal.confirm({
      nzTitle: 'Delete Custom Community?',
      nzContent: `Are you sure you want to delete <b>${community.name}?</b> If you delete this community, you will lose all geography and criteria filters. This can't be undone.`,
      nzOkText: 'Delete Community',
      nzIconType: 'warning',
      nzClassName: 'confirm-modal',
      nzOnOk: () => {
        this.communitiesService.deleteCommunity(community.uuid).subscribe(() => {
          this.communities = this.communities.filter(c => c.uuid !== community.uuid);
        });
      },
    });
  }

  getCommunities(): void {
    this.isLoading = true;
    this.communitiesService.getCommunities().subscribe((communities: any) => {
      this.communities = communities;
      this.isLoading = false;
    });
  }

  selectCommunity(community: any): void {
    this.communities.forEach(community => {
      community.active = false;
    });
    community.active = true;
    this.communityLoaded.emit(community);
    this.filterStore.dispatch(FilterActions.savedCommunitySelected({communitySelected: true}));
    this.geoFilter.dispatch(GeoFilterActions.geoFilterExplorerSaved({geoFiltersSaved: community}));
    this.geoFilter.dispatch(GeoFilterActions.geoFilterExplorerApplied({geoFilters: community}));
    this.close();
  }

  get isSaveCommunityDrawerVisible() {
    return this._isSaveCommunityDrawerVisible;
  }

  set isSaveCommunityDrawerVisible(visible: boolean) {
    if (visible === false) {
      this.communities = [];
      this.open();
      this.getCommunities();
    }
    this._isSaveCommunityDrawerVisible = visible;
  }

  openSaveDrawer(community: any) {
    this.close();
    this.currentCommunity = community;
    this.isSaveCommunityDrawerVisible = true;
  }
}
