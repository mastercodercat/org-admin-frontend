import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {MixpanelService} from '../../services/mixpanel.service';

@Component({
  selector: 'exp-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() categories: string[] | undefined;
  @Input() series: any[] | undefined;
  @Input() percentage: any[] | undefined;
  @Input() location: string | undefined;
  @Input() type: any | undefined;

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined;
  chartOptionsTwo: Highcharts.Options | undefined;
  percentageSeries: any[] | undefined;
  updateChart = false;
  chartViewSelection = 'actual';
  showPercentage = false;

  constructor(private mixpanel: MixpanelService) { }

  ngOnInit(): void {
    if (this.location === undefined){ this.location = ''; }
    this.percentageSeries = [];
    // this.getPercentage(this.series);
    const chartOneColors = ['#f94144', '#ff7846', '#f9a64a', '#feef56', '#d9ef36', '#7fc250', '#00c288', '#009ba0', '#00558e'];
    const chartTwoColors = ['#01665e', '#80cdc1', '#e1ead7', '#dfc27d', '#bf812d'];
    if (this.type) {
      this.chartOptions = this.setChartOptions(this.series, 20, this.categories, chartTwoColors);
      this.chartOptionsTwo = this.setChartOptions(this.percentage, 20, this.categories, chartTwoColors, 100, true);
    } else {
      this.getPercentage(this.series);
      this.chartOptions = this.setChartOptions(this.series, 20, this.categories, chartOneColors);
      this.chartOptionsTwo = this.setChartOptions(this.percentageSeries, 60, [this.location], chartOneColors, 100, true);
    }
  }
  getPercentage(num: any[] | undefined): void {
    let total = 0;
    if (num) {
      for (const a of num) {
        total = total + a.data[0].y;
      }
      for (const a of num) {
        const copyObj = JSON.parse(JSON.stringify(a));
        copyObj.data[0] = Number(((copyObj.data[0].y / total) * 100).toFixed());
        this.percentageSeries?.push(copyObj);
      }
    }
  }
  changeToPercentage(): void{
    this.showPercentage = true;
  }
  changeToActual(): void{
    this.showPercentage = false;
  }
  chartViewChange(selected: any): void {
    // this.mixpanel.track('Chart', {clicked: selected, chart: this.title});
    if (selected === 'percentage') {
      this.changeToPercentage();
    } else {
      this.changeToActual();
    }
  }
  setChartOptions(series: any, barWidth: number, categories: string[] | undefined,
                  colorArray: string[],  maxValue?: number, dataLabels?: boolean): any {
    let chartHeight = 350;
    if (this.title === 'Gender' || this.title === 'Civic Score By Gender') {
      chartHeight = 250;
    }
    return {
      chart: {
        type: 'bar',
        height: chartHeight,
        width: 530
      },
      title: {
        text: this.title,
        align: 'left'
      },
      subtitle: {
        text: this.location,
        align: 'left',
        style: {
          color: '#c2c2c2',
          fontWeight: 'light'
        }
      },
      colors: colorArray,
      credits: {
        enabled: false
      },
      tooltip: {
        useHTML: true,
        formatter(): any {
          // @ts-ignore
          const formattedNumber = this.y.toLocaleString();
          // @ts-ignore
          return `<div><span>${this.key}: ${formattedNumber}</span></div>`;
        }
      },
      xAxis: {
        categories,
        startOnTick: true
      },
      yAxis: {
        max: maxValue,
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        reversed: true,
        verticalAlign: 'top',
        width: '100%',
        itemStyle: {
          fontSize: '10px',
        }
      },
      plotOptions: {
        bar: {
          pointWidth: barWidth
        },
        series: {
          states: {
            inactive: {
              opacity: 0.75
            },
            hover: {
              halo: {
                opacity: 0.95
              }
            },
          },
          stacking: 'normal',
          dataLabels: {
            enabled: dataLabels,
            format: '{y}%'
          }
        }
      },
      series
    };
  }
}
