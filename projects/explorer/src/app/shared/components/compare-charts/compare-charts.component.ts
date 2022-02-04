import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as Highcharts from 'highcharts';

import { filterList } from '../../stores/filter-store/explorer-filters.selectors';
import { FilterState } from '../../stores/filter-store/explorer-filters.reducer';
import { MapService } from '../../services/map.service';
import { ChartsService } from '../../services/charts.service';
import * as FilterActions from '../../stores/filter-store/explorer-filters.actions';

@Component({
  selector: 'exp-compare-charts',
  templateUrl: './compare-charts.component.html',
  styleUrls: ['./compare-charts.component.scss'],
})
export class CompareChartsComponent implements OnInit, OnDestroy {
  @Input() title: string | undefined;
  @Input() categories: string[] | undefined;
  @Input() series: any[] | undefined;
  @Input() percentage: any[] | undefined;
  @Input() location: string | undefined;
  @Input() type: any | undefined;
  @Input() mapSegment: any | undefined;
  @Input() compareSelected: any | undefined;

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined;
  updateChart = false;
  chartOneColors = [
    '#01665e',
    '#80cdc1',
    '#e1ead7',
    '#dfc27d',
    '#bf812d',
    'rgba(1, 102, 94, 0.3)',
    'rgba(128, 205, 193, 0.3)',
    'rgba(225, 234, 215, 0.3)',
    'rgba(223, 194, 125, 0.3)',
    'rgba(191, 130, 45, 0.3)',
  ];
  usChartData: any;
  compareDropdownSelected = '';
  filters$: Observable<any> | undefined;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private filterStore: Store<FilterState>,
    private mapService: MapService,
    private chartsService: ChartsService,
  ) { }

  ngOnInit(): void {
    console.log(this.location);
    this.filters$ = this.filterStore.pipe(select(filterList));
    this.filters$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      if (res.compareDropdown?.compareDropdown) {
        this.compareDropdownSelected = res.compareDropdown.compareDropdown;
      }
      if (res.compareDropdown?.compareDropdown
        && res.compareDropdown?.compareDropdown !== 'None'
        && res.compareDropdown?.compareDropdown !== 'U.S. Nationwide') {
        if (res.stateChart?.stateChart) {
          this.usChartData = this.sortDataForCompareNational(this.chartsService.barChartData(res.stateChart?.stateChart.data), this.compareDropdownSelected);
          if (this.series) {
            this.sortDataForCompare(this.series, this.title, this.location);
          }
          if (this.percentage) {
            this.sortDataForComparePercentage(this.percentage, this.title, this.location);
          }
          this.updateChart = true;
        } else {
          this.mapService.getAllChartData({state: this.mapSegment.state}, 'state')
            .subscribe(res => {
              if (res?.data.county[0]) {
                const mapSelections: any = this.chartsService.selectionObjectConstruction(res.data.county[0]);
                this.usChartData = this.sortDataForCompareNational(this.chartsService.barChartData(mapSelections), this.compareDropdownSelected);
                this.filterStore.dispatch(FilterActions.stateChartsData({stateChart: {state: this.mapSegment, data: this.usChartData}}));
                if (this.series) {
                  this.sortDataForCompare(this.series, this.title, this.location);
                }
                if (this.percentage) {
                  this.sortDataForComparePercentage(this.percentage, this.title, this.location);
                }
                this.updateChart = true;
              }
            });
        }
      } else if (res.compareDropdown?.compareDropdown && res.compareDropdown?.compareDropdown === 'U.S. Nationwide') {
        this.usChartData = this.sortDataForCompareNational(res.usChart.usChart, 'National');
        if (this.series) {
          this.sortDataForCompare(this.series, this.title, this.location);
        }
        if (this.percentage) {
          this.sortDataForComparePercentage(this.percentage, this.title, this.location);
        }
        this.updateChart = true;
      }
      this.updateChart = false;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  sortDataForCompareNational(dataOne: any, name: string): any {
    const tempArray = [];
    for (const a of dataOne) {
      if (a.totals) {
        for (const b of a.percentage) {
          const tempObject = {name: '', data: [], stack: '', title: a.title};
          tempObject.name = b.name;
          tempObject.data = b.data;
          tempObject.stack = name;
          tempArray.push(tempObject);
        }
      } else {
        let total = 0;
        const tempObject = {name, data: [], title: a.title};
        for (const c of a.series) {
          total = total + Number(c.data[0].y);
        }
        for (const b of a.series ) {
          // @ts-ignore
          tempObject.data.push(Number(((b.data[0].y / total) * 100).toFixed()));
        }
        tempArray.push(tempObject);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return tempArray;
  }

  sortDataForComparePercentage(data: any, title: string | undefined, location: string | undefined): void {
    const tempArray = [];
    if (!data[0].data[0].name) {
      for (const a of data) {
        const tempObject = {name: '', data: [], stack: '', title};
        tempObject.name = a.name;
        tempObject.data = a.data;
        tempObject.stack = location || '';
        tempArray.push(tempObject);
      }
      // Get the national chart values and push into array
      for (const b of this.usChartData) {
        if (b.title === title) {
          tempArray.push(b);
        }
      }
      this.chartOptions = this.setChartOptions(tempArray, 20, this.categories, this.chartOneColors, 'normal', 100);
    }
  }

  sortDataForCompare(data: any, title: string | undefined, location: string | undefined): void {
    const tempArray = [];
    if (data[0].data[0].name) {
      let total = 0;
      const tempObject = {name: location, data: [], title};
      for (const c of data) {
        total = total + Number(c.data[0].y);
      }
      for (const a of data) {
        // @ts-ignore
        // tempObject.data.push(a.data[0].y);
        tempObject.data.push(Number(((a.data[0].y / total) * 100).toFixed()));
      }
      tempArray.push(tempObject);
      for (const b of this.usChartData) {
        if (b.title === title) {
          tempArray.push(b);
        }
      }
      this.chartOptions = this.setChartOptions(tempArray, 20, this.categories, this.chartOneColors);
    }

  }

  setChartOptions(series: any, barWidth: number, categories: string[] | undefined,
                  colorArray: string[], stacking?: string | undefined,  maxValue?: number, dataLabels?: boolean): any {
    let chartHeight = 350;
    if (this.title === 'Gender' || this.title === 'Civic Score By Gender') {
      chartHeight = 250;
    }
    return {
      chart: {
        type: 'column',
        height: chartHeight,
        width: 530,
      },
      title: {
        text: this.title,
        align: 'left',
      },
      subtitle: {
        text: this.location + ' / ' + this.compareDropdownSelected,
        align: 'left',
        style: {
          color: '#c2c2c2',
          fontWeight: 'light',
        },
      },
      colors: colorArray,
      credits: {
        enabled: false,
      },
      tooltip: {
        useHTML: true,
        formatter(): any {
          // @ts-ignore
          const formattedNumber = this.y.toLocaleString();
          // @ts-ignore
          if (this.point.series.userOptions.stack) {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            return `<div><p>${this.point.series.userOptions.stack}<br>${this.point.series.name}</p><span>${this.key}: ${formattedNumber}%</span></div>`;
          } else {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            return `<div><p>${this.point.series.name}</p><span>${this.key}: ${formattedNumber}%</span></div>`;
          }
        },
      },
      xAxis: {
        categories,
      },
      yAxis: {
        max: maxValue,
        min: 0,
        title: {
          text: '',
        },
        labels: {
          format: '{text}%',
        },
      },
      legend: {
        verticalAlign: 'top',
        width: '100%',
        itemStyle: {
          fontSize: '10px',
        },
        // maxHeight: 40,
        // labelFormatter(): any {
        //   // @ts-ignore
        //   // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        //   return this.name;
        // },
      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              opacity: 0.75,
            },
            hover: {
              halo: {
                opacity: 0.95,
              },
            },
          },
          stacking,
          dataLabels: {
            enabled: dataLabels,
            format: '{y}%',
          },
          pointPadding: 0.1,
          groupPadding: 0.2,
        },
      },
      series,
    };
  }

}
