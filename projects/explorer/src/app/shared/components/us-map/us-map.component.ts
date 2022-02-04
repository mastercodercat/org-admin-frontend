import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import Highcharts from 'highcharts/highmaps';
import usMapCounties from '../../../../assets/maps/us-all-all.geo.json';
import usMapStates from '@highcharts/map-collection/countries/us/us-all.geo.json';
import { MapSelection } from './map-selection.model';
import { ThousandSuffixesPipe } from '../../pipes/thousand-suff.pipe';
import { environment } from '../../../../environments/environment';
import { MixpanelService } from '../../services/mixpanel.service';
import {error} from 'highcharts';

@Component({
  selector: 'exp-us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.scss'],
})
export class UsMapComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _zoomIn?: MapSelection;

  @Input() set zoomIn(value: MapSelection | undefined) {
    this._zoomIn = value;
    if (value) {
      const selection = this.chart.get(value.id);
      selection.select();

      selection.zoomTo();
      if (value.category !== 'state') {
        this.chart.mapZoom(2.5);
      }

      // Change to county view
      this.chart.series[1].update({
        visible: false,
      });

      const point: MapSelection = {
        name: selection.name,
        // @ts-ignore
        households: selection.households,
        // @ts-ignore
        people: selection.people,
        // @ts-ignore
        score: parseFloat(selection.value).toFixed(2),
        // @ts-ignore
        id: selection.id,
        // @ts-ignore
        valueUpdated: selection.options.valueUpdated,
        // @ts-ignore
        state: selection.options.state,
        category: value.category,
      };

      this.changeSelection.emit(point);
    } else {
      this.changeSelection.emit();
    }
  }

  @Output() changeSelection = new EventEmitter<MapSelection>();
  @Output() mapReset = new EventEmitter<any>();
  @Output() national = new EventEmitter<any>();

  chart: any;
  counties: any;
  countiesOriginal: any;
  states: any;
  lines = Highcharts.geojson(usMapCounties, 'mapline');
  borderLines = this.lines.filter(l => l.properties['hc-group'] === '__border_lines__');
  // separatorLines = this.lines.filter(l => l.properties['hc-group'] === '__separator_lines__');

  constructor(private mapService: MapService, private thousandSuff: ThousandSuffixesPipe, private mixpanel: MixpanelService) { }

  ngOnInit(): void {
    const mainChart = () => {
      this.changeOverlay();
    };

    const selectionChanged = (point: MapSelection) => {
      if (point.category === 'state') {
        let stateSelected = '';
        stateSelected = point.id !== undefined ? point.id : '';
        this.counties = JSON.parse(JSON.stringify(this.countiesOriginal));
        // this.counties.forEach((a: any) => {
        //   if (a.id) {
        //     const tempValue = a.id.split('-');
        //     if (tempValue[1] === stateSelected) {
        //       a.value = Number(a.value) * 10;
        //       a.valueUpdated = true;
        //     } else {
        //       if (a.valueUpdated) {
        //         a.valueUpdated = false;
        //         a.value = Number(a.value) / 10;
        //       }
        //       a.code = '';
        //     }
        //   }
        // });
        this.chart.series[0].update({data: this.counties}, false);
      }
      this.changeSelection.emit(point);
      // this.mixpanel.track('Map', {selected: point.category, name: point.name});
    };
    const getSuffixes = (a: any, b: any) => this.thousandSuff.transform(a, b);
    if (environment.enableTimers) { console.time('MAP: Get All Data'); }
    this.mapService.getAllAllData().subscribe(data => {
      if (environment.enableTimers) { console.timeEnd('MAP: Get All Data'); }
      this.national.emit(data.countries);
      this.counties = data.counties;
      this.countiesOriginal = JSON.parse(JSON.stringify(data.counties));
      this.states = data.states;
      if (this.states.length < 52) {
        for (const a of usMapStates.features) {
          let insert = true;
          for (const b of data.states) {
            if (a.properties['hc-a2'] === b.code) {
              insert = false;
            }
          }
          if (insert) {
            this.states.push({id: a.properties['hc-a2'], code: a.properties['hc-a2'], value: 0});
          }
        }
      }
      if (environment.enableTimers) { console.time('MAP: Chart Load'); }
      // @ts-ignore
      this.chart = Highcharts.mapChart('container',  {
        chart: {
          borderWidth: 0,
          marginRight: 20, // for the legend
          backgroundColor: 'transparent',
          height: '50%',
          events: {
            // tslint:disable-next-line:typedef
            load() {
              if (environment.enableTimers) { console.timeEnd('MAP: Chart Load'); }
            },
          },
          resetZoomButton: {
            theme: {
              display: 'none',
            },
          },
        },

        credits: {
          enabled: false,
        },

        tooltip: {
          useHTML: true,
          // tslint:disable-next-line:typedef
          formatter() {
            if (this.point.value !== 0) {
              // @ts-ignore
              const people = getSuffixes(Number(this.point.people), 2);
              // @ts-ignore
              const households = getSuffixes(Number(this.point.households), 2);
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
              return `<div class="tooltip-wrapper"><div class="tooltip-upper"><span class="tooltip-score ${colorValue}">${score}</span><span class="tooltip-name">${this.point.name}</span></div><div class="tooltip-lower"><div class="tooltip-lower-left"><span class="tooltip-person-icon"></span>PEOPLE<br><span class="tooltip-lower-numbers">${people}</span></div><div class="tooltip-lower-right"><span class="tooltip-home-icon"></span>HOUSEHOLDS<br><span class="tooltip-lower-numbers">${households}</span></div></div></div>`;
            } else {
              return '<div class="tooltip-wrapper">Call your sales representative for access to this data.</div>';
            }
          },
        },

        title: {
          text: '',
        },

        legend: {
          enabled: false,
        },

        mapNavigation: {
          enabled: false,
        },

        colorAxis: [{
          min: 0,
          max: 20,
          tickInterval: 5,
          stops: [
            [0, '#f2f2f2'],
            [0.015, '#dfc27d'],
            [0.022, '#f6e8c3'],
            [0.026, '#e1ead7'],
            [0.030, '#c7eae5'],
            [0.035, '#80cdc1'],
            [0.040, '#01665e'],
            [0.05, '#dfc27d'],
            [0.15, '#f6e8c3'],
            [0.20, '#e1ead7'],
            [0.25, '#c7eae5'],
            [0.30, '#80cdc1'],
            [0.35, '#01665e'],
            [1, '#3d3d3d'],
          ],
          labels: {
            format: '{value}%',
          },
        }, {
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
            format: '{value}%',
          },
        }],

        plotOptions: {
          mapline: {
            showInLegend: false,
            enableMouseTracking: false,
          },
        },

        series: [{
          mapData: usMapCounties,
          data: this.counties,
          name: undefined,
          colorAxis: 0,
          joinBy: ['hc-key', 'code'],
          borderWidth: 0.5,
          allowPointSelect: true,
          states: {
            hover: {
              borderColor: 'black',
            },
            select: {
              enable: true,
              color: 'rgb(0,0,0,0.01)',
              borderColor: 'black',
            },
          },
          events: {
            // tslint:disable-next-line:typedef
            click(e) {
              const mapSelection: MapSelection = {
                name: e.point.name,
                // @ts-ignore
                households: e.point.households,
                // @ts-ignore
                people: e.point.people,
                // @ts-ignore
                score: parseFloat(e.point.value).toFixed(2),
                // @ts-ignore
                category: 'county',
                // @ts-ignore
                id: e.point.id,
                // @ts-ignore
                valueUpdated: e.point.options.valueUpdated,
                // @ts-ignore
                state: e.point.options.state,
                // // @ts-ignore
                // degree: e.point.degree,
                // // @ts-ignore
                // income: e.point.income,
                // // @ts-ignore
                // marital: e.point.marital,
              };
              mapSelection.mapType = 'nationalCountyMap';
              selectionChanged(mapSelection);
              // const clickedPoint = e;
              // const chart = this.chart.series[0].chart;

              // TODO below will be good for selecting multiple counties
              // chart.series.forEach((s) => {
              //   s.points.forEach((p) => {
              //     // @ts-ignore
              //     if (p.code === clickedPoint.point.code) {
              //       console.log(p);
              //       p.select(undefined, true);
              //     }
              //   });
              // });
            },
          },
        },
        {
          mapData: usMapStates,
          data: this.states,
          name: undefined,
          colorAxis: 1,
          color: 'rgba(0,0,0,0.01)',
          visible: false,
          joinBy: ['postal-code', 'code'],
          events: {
            click(e): void {
              // console.log(e);
              const mapSelection: MapSelection = {
                name: e.point.name,
                // @ts-ignore
                households: e.point.households,
                // @ts-ignore
                people: e.point.people,
                // @ts-ignore
                score: parseFloat(e.point.value).toFixed(2),
                // @ts-ignore
                category: 'state',
                // @ts-ignore
                id: e.point.id,
                // gender: e.point.gender,
                // // @ts-ignore
                // age: e.point.age,
                // // @ts-ignore
                // degree: e.point.degree,
                // // @ts-ignore
                // income: e.point.income,
                // // @ts-ignore
                // marital: e.point.marital,
              };
              selectionChanged(mapSelection);
              e.point.zoomTo();
              mainChart();
            },
          },
        },
        {
          type: 'mapline',
          name: 'State borders',
          data: this.borderLines,
          color: 'white',
          shadow: false,
        }],
      });
    }, () => {}, () => { console.log('I\'m Done!!!!!!!!'); }  );
  }
  changeOverlay(): void {
    // this.mixpanel.track('Map Buttons', {clicked: 'change layer'});
    const isStateVisible = this.chart.series[1].visible;
    this.chart.series[1].update({
      visible: !isStateVisible,
    });
  }
  zoomInControls(): void {
    this.chart.mapZoom(0.5);
  }
  zoomOutControls(): void {
    this.chart.mapZoom(1.5);
  }
}
