import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import Highcharts from 'highcharts/highmaps';
import usMapStates from '@highcharts/map-collection/countries/us/us-all.geo.json';
import { MapService } from '../../services/map.service';
import { ThousandSuffixesPipe } from '../../pipes/thousand-suff.pipe';
import { MapSelection } from '../us-map/map-selection.model';
import { StateModel } from '../../models/states.model';
import { MixpanelService } from '../../services/mixpanel.service';
import { ExplorerState } from '../../stores/state-store/explorer.reducer';
import * as ExplorerActions from '../../stores/state-store/explorer.actions';
import { HighchartMapService } from '../../services/highchart-map.service';
import { TreeRegion } from '../geo-filters-drawer/tree-region.model';
import { GeoFiltersDrawerComponent } from '../geo-filters-drawer/geo-filters-drawer.component';
import { FilterState } from '../../stores/filter-store/explorer-filters.reducer';
import * as FilterActions from '../../stores/filter-store/explorer-filters.actions';
import { GeoFilterState } from '../../stores/geo-filter-store/explorer-geo-filter.reducer';
import * as GeoFilterActions from '../../stores/geo-filter-store/explorer-geo-filter.actions';

@Component({
  selector: 'exp-us-map-states',
  templateUrl: './us-map-states.component.html',
  styleUrls: ['./us-map-states.component.scss'],
})
export class UsMapStatesComponent implements OnInit {
  @Output() changeSelection = new EventEmitter<MapSelection>();
  @Output() statesLoaded = new EventEmitter<MapSelection>();

  properties: any;
  value: any;
  chart: any;
  states: any;
  setPoint: any;
  loading = false;
  selectedMap = 'States';
  geoFilterInUse = false;
  zoomPoint = '';
  // This is the Observable for the selector test.
  // states$: Observable<StateModel[]> | undefined;

  constructor(
    private mapService: MapService,
    private thousandSuff: ThousandSuffixesPipe,
    private mixpanel: MixpanelService,
    private store: Store<ExplorerState>,
    private highchartMapService: HighchartMapService,
    private filterStore: Store<FilterState>,
    private geoFilter: Store<GeoFilterState>,
  ) { }

  // tslint:disable-next-line:variable-name
  // private _selectedRegions?: TreeRegion[];
  @Input() sidepanel?: GeoFiltersDrawerComponent;

  @Input() set updateMapWidth(newWidth: number) {
    // @ts-ignore
    const width = document.getElementById('container').clientWidth - newWidth;
    if (this.chart) {
      this.chart.update({
        chart: {
          width,
        },
      });
    }
  }

  @Input() set updateMapSelection(mapSelected: string) {
    this.userMapSelection(mapSelected);
    this.selectedMap = mapSelected;
  }

  @Input() set selectedRegions(value: TreeRegion[] | undefined) {
    let searchCounty = false;
    if (value && value[0] && value[0].level === 0) {
      let stateSelections = {};
      if (value[0].search) {
        stateSelections = {
          id: value[0].name,
          people: 1,
          name: value[0].name,
          level: undefined,
          segment: [],
        };
      } else {
        stateSelections = {
          id: 'Custom Community',
          people: 1,
          name: value[0].communityName || 'Custom Community',
          level: undefined,
          segment: [],
        };
      }
      value.forEach((el: any) => {
        const tempSegment: any = {state: el.key.replace('US-', '')};
        // @ts-ignore
        stateSelections.segment.push(tempSegment);
      });
      this.changeSelection.emit(stateSelections);
      // here we will load the national map with the states selected
      this.displayNationalMap(value, true);
    } else if (value && value[0] && value[0].level === 1) {
      let countySelections = {};
      if (value[0].search) {
        searchCounty = true;
        countySelections = {
          // @ts-ignore
          id: value[0].id,
          people: 1,
          name: value[0].name,
          level: undefined,
          segment: [],
        };
      } else if (value[0].communityName) {
        countySelections = {
          // @ts-ignore
          id: value[0].communityName,
          people: 1,
          name: value[0].communityName,
          level: undefined,
          segment: [],
        };
      } else {
        countySelections = {
          id: 'Custom Community',
          people: 1,
          name: 'Custom Community',
          level: undefined,
          segment: [],
        };
      }

      // here we will load the state map with the counties selected
      if (value[0].type === 'county' || searchCounty) {
        value.forEach((el: any) => {
          const splitId = el.key.split('-');
          const tempSegment: any = { state: splitId[1], county: splitId[2] };
          // @ts-ignore
          countySelections.segment.push(tempSegment);
        });
        this.changeSelection.emit(countySelections);
        // @ts-ignore
        this.displayStateMap(value[0].parentCode.replace('US-', ''), value[0].parentCode, value);
      } else if (value[0].type === 'congress') {
        value.forEach((el: any) => {
          const splitId = el.key.split('-');
          const tempSegment: any = { state: splitId[1], congress: splitId[2] };
          // @ts-ignore
          countySelections.segment.push(tempSegment);
        });
        this.changeSelection.emit(countySelections);
        // @ts-ignore
        this.displayCongressionalDistrictsMap(value[0].parentCode.replace('US-', ''), value);
      } else if (value[0].type === 'postcode') {
        value.forEach((el: any) => {
          const splitId = el.key.split('-');
          const tempSegment: any = { state: splitId[1], postcode: splitId[2] };
          // @ts-ignore
          countySelections.segment.push(tempSegment);
        });
        this.changeSelection.emit(countySelections);
        // @ts-ignore
        this.displayPostalMap(value[0].parentCode.replace('US-', ''), value);
      }
    } else if (value && value[0] && value[0].level === 2) {
      // @ts-ignore
      this.displayPostalMap(value[0].name, undefined, value[0].id);
    }
  }

  ngOnInit(): void {
    this.displayNationalMap();
  }

  userMapSelection = (e: string): void => {
    if (e === 'Congressional Districts' && this.setPoint){
      this.displayCongressionalDistrictsMap(this.setPoint.code);
    }
    if (e === 'Zipcodes' && this.setPoint) {
      this.displayPostalMap(this.setPoint.code);
    }
    if (e === 'Counties' && this.setPoint) {
      this.displayStateMap(this.setPoint.code, this.setPoint.id);
    }
    if (e === 'States') {
      // this.displayNationalMap();
    }
  };

  displayNationalMap(geoFilterSelections?: TreeRegion[], cancelFilterUpdate?: boolean): void {
    this.geoFilterInUse = geoFilterSelections ? true : false;
    const stateClickedSelection = (point: any): void => {
      this.setPoint = {
        id: point.id,
        code: point.code,
        name: point.name,
        people: point.people,
        households: point.households,
      };
      const stateSelections = {
        id: point.id,
        people: point.people,
        name: point.name,
        level: 'state',
        segment: {state: point.id.replace('US-', '')},
      };
      // this.mixpanel.setPeople({map: 'us-state', clicked: stateSelections});
      this.changeSelection.emit(stateSelections);
      this.userMapSelection('Counties');
      this.filterStore.dispatch(FilterActions.filterExplorerSaveCommunityActive({saveButtonActive: false}));
    };
    const usMap = Highcharts.geojson(usMapStates);
    // This is and example of using the effect to load the data into the stores.
    // We dispatch and action that will trigger the effect that will populate the stores.
    // After the stores is populated you can use a selector to retrieve the data.
    // Example of the selector is at the bottom of the file.
    // this.stores.dispatch(ExplorerActions.loadExplorersStates());
    this.mapService.getStateData().subscribe((states: StateModel[]) => {
      if (!cancelFilterUpdate) {
        this.changeSelection.emit({id: 'US', name: 'US'});
      }
      // after data is returned we are adding the state data to the stores.
      this.store.dispatch(ExplorerActions.loadExplorersStatesSuccess({states}));
      this.states = states;
      usMap.forEach((el: any, i) => {
        el.drilldown = el.properties['hc-key'];
      });
      if (geoFilterSelections) {
        this.states.forEach((fl: any) => {
          fl.selected = true;
          geoFilterSelections.forEach((gl: any) => {
            if (fl.code === gl.key.replace('US-', '')) {
              fl.selected = false;
            }
          });
        });
      }
      const nationalMap = this.highchartMapService.getChart(usMap, this.states, ['postal-code', 'code']);
      nationalMap.series[0].point.events = {
        click(state: any): void{
          if (!geoFilterSelections) {
            stateClickedSelection(state.point);
          }
        },
      };
      this.chart = Highcharts.mapChart('container', nationalMap);
      // This is and example if we wanted to use the selector
      // to get data from the stores after it's been populated.
      //
      // this.states$ = this.stores.pipe(select(statesList));
      // this.states$.subscribe(resTwo => console.log(resTwo));
    });
  }

  resetMap(): void {
    this.displayNationalMap();
    this.sidepanel?.clearSelections();
    this.geoFilter.dispatch(GeoFilterActions.geoFilterExplorerApplied({geoFilters: null}));
  }

  displayStateMap(code: string, id: string, geoFilterSelections?: TreeRegion[]): void {
    this.geoFilterInUse = geoFilterSelections ? true : false;
    const countyClickedSelection = (point: any, data: any): void => {
      const splitId = point.point.segment.split('-');
      const countySelections = {
        households: point.point.options.totals.households,
        id: point.point.segment,
        name: point.point.options.county,
        people: point.point.options.totals.people,
        score: point.point.options.totals.civic_score,
        state: point.point.options.state,
        level: 'county',
        segment: {state: splitId[1], county: splitId[2]},
      };
      // this.mixpanel.setPeople({map: 'us-counties', clicked: countySelections});
      this.changeSelection.emit(countySelections);
      const newData = this.loopDataForSelect(data, point.point.segment);
      this.chart.series[0].update({data: newData}, false);
      this.chart.redraw();
    };
    this.loading = true;
    this.highchartMapService.getJsonfile('county', id.toLowerCase()).subscribe( map => {
      const provinceData = Highcharts.geojson(map);
      this.mapService.getCountyData('county', code).subscribe(res => {
        res.data.county.forEach((f: any) => {
          f.value = f.totals.civic_score;
        });
        // Set map value
        provinceData.forEach((el: any) => {
          el.properties['hc-key'] = el.properties['hc-key'].toUpperCase();
        });
        if (geoFilterSelections) {
          res.data.county.forEach((fl: any) => {
            fl.selected = true;
            geoFilterSelections.forEach((gl: any) => {
              if (fl.segment === gl.key) {
                fl.selected = false;
              }
            });
          });
        }
        const countiesMap = this.highchartMapService.getChart(provinceData, res.data.county, ['hc-key', 'segment']);
        countiesMap.series[0].events = {
          click(county: any): void{
            if (!geoFilterSelections) {
              countyClickedSelection(county, res.data.county);
            }
          },
        };
        this.chart = Highcharts.mapChart('container', countiesMap);
        // this.chart.addSeries(countiesMap, true);
        // this.chart.series[0].remove();

        this.loading = false;
      });
    });
  }

  displayCongressionalDistrictsMap(code: string, geoFilterSelections?: TreeRegion[]): void {
    this.geoFilterInUse = !!geoFilterSelections;
    const districtClickedSelection = (point: any, data: any): void => {
      const splitId = point.point.segment.split('-');
      const districtSelections = {
        households: point.point.options.totals.households,
        id: point.point.segment,
        name: point.point.name,
        people: point.point.options.totals.people,
        score: point.point.options.totals.civic_score,
        state: point.point.options.state,
        level: 'congress',
        segment: {state: splitId[1], congress: splitId[2]},
      };
      // this.mixpanel.setPeople({map: 'us-congressional-district', clicked: districtSelections});
      this.changeSelection.emit(districtSelections);
      const newData = this.loopDataForSelect(data, point.point.segment);
      this.chart.series[0].update({data: newData}, false);
      this.chart.redraw();
    };
    this.loading = true;
    this.highchartMapService.getJsonfile('district', code).subscribe( res => {
      res.features.forEach((fl: any) => {
        fl.properties.name = fl.properties.NAMELSAD;
      });
      this.mapService.getCountyData('congress', code).subscribe(data => {
        data.data.county.forEach((el: any) => {
          if (el.segment) {
            if (el.congress.length === 1) {
              el.congress = '0' + el.congress;
            }
            el.people = el.totals.people;
            el.households = el.totals.households;
            el.value = el.totals.civic_score;
          }
        });
        if (geoFilterSelections) {
          data.data.county.forEach((fl: any) => {
            fl.selected = true;
            geoFilterSelections.forEach((gl: any) => {
              if (fl.segment === gl.key) {
                fl.selected = false;
              }
            });
          });
        }
        const districtsMap = this.highchartMapService.getChart(Highcharts.geojson(res), data.data.county, ['CD116FP', 'congress']);
        districtsMap.series[0].events = {
          click(district: any): void{
            if (!geoFilterSelections) {
              districtClickedSelection(district, data.data.county);
            }
          },
        };
        // this.chart.addSeries(districtsMap, true);
        // this.chart.series[0].remove();
        this.chart = Highcharts.mapChart('container', districtsMap);
        this.loading = false;
      });
    });
  }

  displayPostalMap(code: string, geoFilterSelections?: TreeRegion[], zipcode?: string): void {
    this.geoFilterInUse = !!geoFilterSelections;
    const postalClickedSelection = (point: any, data: any): void => {
      const splitId = point.point.segment.split('-');
      const postalSelections = {
        households: point.point.options.totals.households,
        id: point.point.segment,
        name: point.point.name,
        people: point.point.options.totals.people,
        score: point.point.options.totals.civic_score,
        state: point.point.options.state,
        level: 'postcode',
        segment: {state: splitId[1], postcode: splitId[2]},
      };
      // this.mixpanel.setPeople({map: 'us-postal', clicked: postalSelections});
      this.changeSelection.emit(postalSelections);
      const newData = this.loopDataForSelect(data, point.point.segment);
      this.chart.series[0].update({data: newData}, false);
      this.chart.redraw();
    };
    this.loading = true;
    this.highchartMapService.getJsonfile('postal', code).subscribe( res => {
      res.features.forEach((fl: any) => {
        fl.properties.name = fl.properties.GEOID20;
      });
      this.mapService.getCountyData('postcode', code).subscribe(data => {
        data.data.county.forEach((el: any) => {
          el.people = el.totals.people;
          el.households = el.totals.households;
          el.value = el.totals.civic_score;
        });
        if (geoFilterSelections) {
          data.data.county.forEach((fl: any) => {
            fl.selected = true;
            geoFilterSelections.forEach((gl: any) => {
              if (fl.segment === gl.key) {
                fl.selected = false;
                fl.id = fl.segment;
                this.zoomPoint = fl.segment;
              }
            });
          });
        }
        if (code && zipcode) {
          // @ts-ignore
          data.data.county = this.loopDataForSearch(data.data.county, zipcode);
        }
        const postalMap = this.highchartMapService.getChart(Highcharts.geojson(res), data.data.county, ['GEOID20', 'postcode']);
        postalMap.series[0].events = {
          click(postal: any): void{
            if (!geoFilterSelections) {
              postalClickedSelection(postal, data.data.county);
            }
          },
        };
        // this.chart.addSeries(postalMap, true);
        // this.chart.series[0].remove();
        this.chart = Highcharts.mapChart('container', postalMap);
        this.loading = false;
        if (this.zoomPoint !== '') {
          this.chart.get(this.zoomPoint).zoomTo();
          this.chart.mapZoom(5);
          this.zoomPoint = '';
        }
      });
    });
  }
  loopDataForSelect(data: any, point: any): any {
    data.forEach((fl: any) => {
      if (point === fl.segment) {
        fl.selected = false;
      } else {
        fl.selected = true;
      }
    });
    return data;
  }
  loopDataForSearch(data: any, zipcode: string): any {
    data.forEach((fl: any) => {
      if (zipcode === fl.postcode) {
        fl.selected = false;
        fl.id = fl.segment;
        this.zoomPoint = fl.segment;
      } else {
        fl.selected = true;
      }
    });
    return data;
  }
  zoomInControls(): void {
    this.chart.mapZoom(0.5);
  }
  zoomOutControls(): void {
    this.chart.mapZoom(1.5);
  }
}
// add to test deployment pipeline
