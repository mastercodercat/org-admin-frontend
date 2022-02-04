import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize  } from 'rxjs/operators';
import { NzMessageService  } from 'ng-zorro-antd/message';

import { CommunitiesService } from '../../services/communities.service';
import { FilterState } from '../../stores/filter-store/explorer-filters.reducer';
import * as FilterActions from '../../stores/filter-store/explorer-filters.actions';
import { MapSelection } from '../us-map/map-selection.model';
import {Store} from '@ngrx/store';
import {filterExplorerCommunityUpdated} from '../../stores/filter-store/explorer-filters.actions';

@Component({
  selector: 'exp-community-save-drawer',
  templateUrl: './community-save-drawer.component.html',
  styleUrls: ['./community-save-drawer.component.scss'],
})
export class CommunitySaveDrawerComponent implements OnInit, OnChanges {
  @Input() selections: MapSelection = {};
  @Input() existingCommunity: any = {};
  @Input() isVisible = false;
  @Input() criteriaFilters: any = [];
  @Input() geoFilters: any = [];
  @Output() isVisibleChange = new EventEmitter<boolean>();

  // @ts-ignore
  saveCommunityForm: FormGroup;
  saveAsNewProcessing = false;
  saveProcessing = false;
  _criteriaFilters: any = [];
  _geoFilters: any = [];
  criteriaTitleMapping: any = {
    age: 'Age',
    gender: 'Gender',
    marital: 'Marital Status',
    hh_income: 'Income',
    education: 'Education',
    voted: 'Voted',
    donor: 'Donated to',
    party: 'Party',
    civic_score: 'Civic Score',
  };

  constructor(
    private formBuilder: FormBuilder,
    private communitiesService: CommunitiesService,
    private message: NzMessageService,
    private filterStore: Store<FilterState>,
  ) { }

  ngOnInit(): void {
    this.saveCommunityForm = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(100)]],
      notes: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.isVisible?.currentValue) {
      this._criteriaFilters = this.existingCommunity?.criteriaFilters || this.criteriaFilters;
      this._geoFilters = this.existingCommunity?.geoFilters || this.geoFilters;
      this.saveCommunityForm = this.formBuilder.group({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        name: [(this.existingCommunity?.name || ''), [Validators.required]],
        description: [(this.existingCommunity?.description || ''), [Validators.maxLength(100)]],
        notes: [(this.existingCommunity?.notes || '')],
        criteriaFilters: [this._criteriaFilters],
        geoFilters: [(this._geoFilters)],
      });
    }
  }

  configureCriteriaDisplayName(criteria: any): string {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${this.criteriaTitleMapping[criteria.value.property]}: ${criteria.label}`;
  }

  close(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  save(isSaveAsNew?: boolean): void {
    const {name, description, notes} = this.saveCommunityForm.value;
    let filters = {};
    if (isSaveAsNew) {
      this.saveAsNewProcessing = true;
    } else {
      this.saveProcessing = true;
      filters = {
        criteriaFilters: JSON.stringify(this._criteriaFilters),
        geoFilters: JSON.stringify(this._geoFilters),
        selections: JSON.stringify(this.selections),
      };
    }
    this.communitiesService.create({
      communityAttr: {
        name,
        description,
        notes,
        ...filters,
      },
    }).pipe(
      finalize(() => {
        this.saveProcessing = false;
        this.saveAsNewProcessing = false;
      }),
    ).subscribe(
      newCommunity => {
        this.close();
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        this.message.success(`The community (${newCommunity.name}) successfully created`);
      },
      err => {
        this.message.error('An error occur saving the community');
      },
    );
  }

  update(): void {
    const {name, description, notes} = this.saveCommunityForm.value;
    const uuid = this.existingCommunity.uuid;
    this.saveProcessing = true;
    this.communitiesService.update({
      uuid,
      communityAttr: {
        name,
        description,
        notes,
      },
    }).pipe(
      finalize(() => {
        this.saveProcessing = false;
      }),
    ).subscribe(
      updatedCommunity => {
        this.close();
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        this.message.success(`The community (${updatedCommunity.name}) successfully updated`);
      },
      err => {
        this.message.error('An error occur updating the community');
      },
    );
    this.filterStore.dispatch(FilterActions.filterExplorerCommunityUpdated({communityUpdated: true}));
  }

  cancel($event: any): void {
    this.saveProcessing = false;
    this.saveAsNewProcessing = false;
    this.close();
  }

  saveOrUpdate(): void {
    if (this.existingCommunity && this.existingCommunity.uuid) {
      this.update();
    } else {
      this.save();
    }
    this.filterStore.dispatch(FilterActions.filterExplorerSaveCommunityClicked({saveButtonClicked: true}));
  }

}
