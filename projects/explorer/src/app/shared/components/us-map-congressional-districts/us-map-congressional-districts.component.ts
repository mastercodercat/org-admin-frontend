import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import Highcharts from 'highcharts/highmaps';
import Drilldown from 'highcharts/modules/drilldown';
import usMapStates from '@highcharts/map-collection/countries/us/us-all.geo.json';
import { MapService } from '../../services/map.service';
import { ThousandSuffixesPipe } from '../../pipes/thousand-suff.pipe';
import { MapSelection } from '../us-map/map-selection.model';
import { MixpanelService } from '../../services/mixpanel.service';
Drilldown(Highcharts);

@Component({
  selector: 'exp-us-map-congressional-districts',
  templateUrl: './us-map-congressional-districts.component.html',
  styleUrls: ['./us-map-congressional-districts.component.scss']
})
export class UsMapCongressionalDistrictsComponent implements OnInit {
  drilldown: any;
  properties: any;
  value: any;
  chart: any;
  states: any;

  @Output() changeSelection = new EventEmitter<MapSelection>();

  constructor(private mapService: MapService, private thousandSuff: ThousandSuffixesPipe, private mixpanel: MixpanelService) { }

  ngOnInit(): void {
    const usMap = Highcharts.geojson(usMapStates);
    const getSuffixes = (a: any, b: any) => {
      return this.thousandSuff.transform(a, b);
    };
    const getCountyData = (selected: string): Observable<any> => {
      return this.mapService.getCountyData('county', selected);
    };
    const countyClickedSelection = (point: any) => {
      const countySelections = {
        households: point.point.options.totals.households,
        id: point.point.segment,
        name: point.point.options.county,
        people: point.point.options.totals.people,
        score: point.point.options.totals.civic_score,
        state: point.point.options.state
      };
      // this.mixpanel.setPeople({map: 'us-CD', clicked: countySelections});
      this.changeSelection.emit(countySelections);
    };
    const stateClickedSelection = (point: any) => {
      const stateSelections = {
        id: point.id,
        people: point.people,
        name: point.name
      };
      // this.mixpanel.setPeople({map: 'us-state', clicked: stateSelections});
      this.changeSelection.emit(stateSelections);
    };

    this.mapService.getStateData().subscribe(data => {
      this.changeSelection.emit({id: 'US', name: 'US'});
      this.states = data.states;
      usMap.forEach((el: any, i) => {
        el.drilldown = el.properties['hc-key'];
      });
      // @ts-ignore
      this.charts = Highcharts.mapChart('container', {
        chart: {
          backgroundColor: 'transparent',
          height: '50%',
          events: {
            drilldown(e: any): void {
              const chart = this as any;
              const cDistricts = 'countries/us/custom/' + e.point.drilldown + '-congress-113';
              const mapData = require(`@highcharts/map-collection/${cDistricts}.geo.json`);
              const provinceData = Highcharts.geojson(mapData);
              // Set map value
              getCountyData(e.point.code).subscribe(res => {
                res.data.county.forEach((f: any) => {
                  f.value = f.totals.civic_score;
                });
                // Set map value
                provinceData.forEach((el: any) => {
                  el.properties['hc-key'] = el.properties['hc-key'].toUpperCase();
                  el.name = e.point.name;
                  el.people = e.point.people;
                  el.households = e.point.households;
                });

                chart.addSeriesAsDrilldown(e.point, {
                  name: e.point.name,
                  mapData: provinceData,
                  data: res.data.county,
                  joinBy: ['hc-key', 'segment'],
                  states: {
                    hover: {
                      color: 'rgba(225, 234, 215, 0.5)',
                      borderColor: 'gray'
                    }
                  },
                  events: {
                    // tslint:disable-next-line:typedef
                    click(el: any) {
                      countyClickedSelection(el);
                    }
                  },

                  dataLabels: {
                    enabled: false
                  }
                });

                chart.setTitle(null, {text: e.point.name});
              });
            },
            drillup(a: any): void{
              stateClickedSelection({id: 'US', name: 'US'});
            }
          }
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        tooltip: {
          useHTML: true,
          // tslint:disable-next-line:typedef
          formatter() {
            if (this.point.value !== 0) {
              let score = 0;
              // @ts-ignore
              if (this.point?.options?.valueUpdated) {
                score = Math.round(((Number(this.point.value) + Number.EPSILON) * 100) / 10);
              } else {
                score = Math.round((Number(this.point.value) + Number.EPSILON) * 100);
              }
              let colorValue = 'tooltip-score-color-two';
              if (score > 33 && score < 47) {
                colorValue = 'tooltip-score-color-three';
              } else if (score > 46 && score < 55) {
                colorValue = 'tooltip-score-color-four';
              } else if (score > 54 && score < 60) {
                colorValue = 'tooltip-score-color-five';
              } else if (score > 59 && score < 70) {
                colorValue = 'tooltip-score-color-six';
              } else if (score > 69) {
                colorValue = 'tooltip-score-color-seven';
              }
              // @ts-ignore
              const name = this.point.county ? this.point.county : this.point.name;
              // @ts-ignore
              const people = this.point.county ?
                // @ts-ignore
                getSuffixes(Number(this.point.totals.people), 2) : getSuffixes(Number(this.point.people), 2);
              // @ts-ignore
              const households = this.point.county ?
                // @ts-ignore
                getSuffixes(Number(this.point.totals.households), 2) : getSuffixes(Number(this.point.households), 2);

              // @ts-ignore
              return `<div class="tooltip-wrapper"><div class="tooltip-upper"><span class="tooltip-score ${colorValue}">${score}</span><span class="tooltip-name">${name}</span></div><div class="tooltip-lower"><div class="tooltip-lower-left"><span class="tooltip-person-icon"></span>PEOPLE<br><span class="tooltip-lower-numbers">${people}</span></div><div class="tooltip-lower-right"><span class="tooltip-home-icon"></span>HOUSEHOLDS<br><span class="tooltip-lower-numbers">${households}</span></div></div></div>`;
            } else {
              return `<div class="tooltip-wrapper">Call your sales representative for access to this data.</div>`;
            }
          }
        },
        title: {
          text: ''
        },
        colorAxis: {
          min: 0,
          max: 25,
          stops: [
            [0, '#ebebeb'],
            [0.010, '#dfc27d'],
            [0.014, '#f6e8c3'],
            [0.018, '#e1ead7'],
            [0.020, '#c7eae5'],
            [0.025, '#80cdc1'],
            [0.030, '#01665e'],
            [1, '#3d3d3d'],
          ],
          labels: {
            format: '{value}%'
          },
        },

        mapNavigation: {
          enabled: false,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },
        plotOptions: {
          map: {
            states: {
              hover: {
                color: '#F8BA03'
              }
            }
          },
          mapline: {
            showInLegend: false,
            enableMouseTracking: false
          }
        },
        series: [
          {
            name: 'National',
            mapData: usMap,
            data: this.states,
            visible: true,
            joinBy: ['postal-code', 'code'],
            states: {
              hover: {
                color: 'rgba(225, 234, 215, 0.5)',
                borderColor: 'gray'
              }
            },
            point: {
              events: {
                click(state: any): void{
                  stateClickedSelection(state.point);
                }
              }
            }
          }
        ],
      });
    });
  }

}
