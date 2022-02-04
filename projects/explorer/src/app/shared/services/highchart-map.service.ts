import { Injectable } from '@angular/core';
import { ThousandSuffixesPipe } from '../pipes/thousand-suff.pipe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HighchartMapService {

  constructor(private thousandSuff: ThousandSuffixesPipe, private http: HttpClient) { }

  getChart(mapData: any, data: any, joinBy?: any[]): any {
    const getSuffixes = (a: any, b: any) => this.thousandSuff.transform(a, b);
    const map = {
      chart: {
        backgroundColor: 'transparent',
        height: '50%',
        style: {
          cursor: 'grab',
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        useHTML: true,
        // tslint:disable-next-line:typedef
        formatter(): any {
          // @ts-ignore
          if (this.point.value !== 0) {
            let score = 0;
            // @ts-ignore
            if (this.point?.options?.valueUpdated) {
              // @ts-ignore
              score = Math.round(((Number(this.point.value) + Number.EPSILON) * 100) / 10);
            } else {
              // @ts-ignore
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
            const people = this.point.county
              // @ts-ignore
              ? getSuffixes(Number(this.point.totals.people), 2) : getSuffixes(Number(this.point.people), 2);
            // @ts-ignore
            const households = this.point.county
              // @ts-ignore
              ? getSuffixes(Number(this.point.totals.households), 2) : getSuffixes(Number(this.point.households), 2);

            // @ts-ignore
            return `<div class="tooltip-wrapper"><div class="tooltip-upper"><span class="tooltip-score ${colorValue}">${score}</span><span class="tooltip-name">${name}</span></div><div class="tooltip-lower"><div class="tooltip-lower-left"><span class="tooltip-person-icon"></span>PEOPLE<br><span class="tooltip-lower-numbers">${people}</span></div><div class="tooltip-lower-right"><span class="tooltip-home-icon"></span>HOUSEHOLDS<br><span class="tooltip-lower-numbers">${households}</span></div></div></div>`;
          } else {
            return '<div class="tooltip-wrapper">Call your sales representative for access to this data.</div>';
          }
        },
      },
      title: {
        text: '',
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
          format: '{value}%',
        },
      },

      mapNavigation: {
        enabled: false,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: '#F8BA03',
            },
          },
        },
        mapline: {
          showInLegend: false,
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: 'National',
          mapData,
          data,
          visible: true,
          joinBy,
          states: {
            hover: {
              color: 'rgba(225, 234, 215, 0.5)',
              borderColor: 'gray',
            },
            select: {
              enabled: true,
              color: '#d9d7d7',
            },
          },
          point: {
            events: {
            },
          },
        },
      ],
    };
    return map;
  }

  addNewSeries(mapData: any, data: any, joinBy?: any[]): any {
    const newSeries = {
      mapData,
      data,
      joinBy,
      states: {
        hover: {
          color: 'rgba(225, 234, 215, 0.5)',
          borderColor: 'gray',
        },
        select: {
          enabled: true,
          color: '#d9d7d7',
        },
      },
      events: {
      },

      dataLabels: {
        enabled: false,
      },
    };
    return newSeries;
  }
  getJsonfile(region: string, location: string): Observable<any> {
    if (region === 'district') {
      return this.http.get(`./assets/maps/postal-districts/${location}-cd-1e2.json`);
    } else if (region === 'postal') {
      return this.http.get(`./assets/maps/postal-districts/${location}-zip-1e2.json`);
    }else {
      return this.http.get(`./assets/maps/counties/${location}-all.geo.json`);
    }
  }
}
