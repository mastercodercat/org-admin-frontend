import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MapService } from '../../services/map.service';
import { MapSelection } from '../us-map/map-selection.model';
import { MixpanelService } from '../../services/mixpanel.service';

@Component({
  selector: 'exp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Output() searchChange = new EventEmitter<MapSelection>();

  options: Array<{ name: string; id: string; state: string; category: string; meta?: any }> = [];
  searchControl = new FormControl();
  loader = false;

  constructor(private mapService: MapService, private mixpanel: MixpanelService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe(newValue => this.searchLocation(newValue));
  }

  searchLocation(q: string): void {
    this.loader = true;
    // this.mixpanel.track('Map Search', {typed: q});
    this.options = [];

    if (!q) {
      this.loader = false;
      return;
    }

    this.mapService.getSearchData(q).subscribe((res: any) => {
      res.data.county.forEach((item: any) => {
        this.options.push({
          id: item.id,
          name: item.label,
          state: item.label === item.stateName ? 'state' : item.stateName,
          category: item.level,
          meta: item,
        });
      });

      this.loader = false;
    });
  }

  searchItemSelected(event: any, item: any): void {
    if (event.isUserInput) {
      const mapItem: MapSelection = {
        id: item.id,
        category: item.category,
        meta: item.meta,
      };
      // this.mixpanel.track('Map Search', {clicked: mapItem.id});
      this.searchChange.emit(mapItem);
      this.cleanSearch();
    }
  }

  cleanSearch(): void {
    this.searchControl.setValue('');
  }
}
