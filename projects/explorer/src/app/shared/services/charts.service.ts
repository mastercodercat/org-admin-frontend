import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {

  constructor() { }

  barChartData(selection: any): any[] {
    const barCharts = [];
    barCharts.push(this.getData(selection?.age, selection?.name, 'Age'));
    barCharts.push(this.getBuckets(selection?.age, 'Civic Score By Age'));
    barCharts.push(this.getData(selection?.degree, selection?.name, 'Education Level'));
    barCharts.push(this.getBuckets(selection?.degree, 'Civic Score By Education Level'));
    barCharts.push(this.getData(selection?.income, selection?.name, 'Income'));
    barCharts.push(this.getBuckets(selection?.income, 'Civic Score By Income'));
    // barCharts.push(this.getData(selection?.marital, selection?.name, 'Marital Status'));
    // barCharts.push(this.getBuckets(selection?.marital, 'Civic Score By Marital Status'));
    barCharts.push(this.getData(selection?.gender, selection?.name, 'Gender'));
    barCharts.push(this.getBuckets(selection?.gender, 'Civic Score By Gender'));

    return barCharts;
  }

  getData(input: any, name: string, title: string): any {
    const chartData: any = { categories: [''], series: [], title };
    chartData.categories = [];
    let count = 0;
    for (const c in input) {
      if (c) {
        if (c !== '__typename') {
          let correctedC = c.replace('c_', '');
          correctedC = correctedC.replace(/_/g, ' ');
          correctedC = this.capitalize(correctedC);
          chartData.categories.push(correctedC);
          chartData.series.push({name: correctedC, data: [{name: correctedC, y: Number(input[c].total), x: count}]});
          count++;
        }
      }
    }
    return chartData;
  }

  getBuckets(bucket: any, title: string): any {
    const bucketList = [ 'Most Engaged', 'Active Participant', 'Participant', 'Occasional Participant', 'Least Engaged' ];
    const chartData: { categories: string[]; series: any[]; percentage: any[]; totals: any; title: string; type: boolean }
      = { categories: [], series: [], percentage: [], totals: {}, title, type: true};
    const tempArray = [];
    for (const group in bucket) {
      if (group && group !== '__typename') {
        chartData.categories.push(group);
        let correctedC = group.replace('c_', '');
        correctedC = correctedC.replace(/_/g, ' ');
        correctedC = this.capitalize(correctedC);
        tempArray.push(correctedC);
        let getTotal = 0;
        for (const total in bucket[group].models.civic_scores) {
          if (total && total !== '__typename') {
            getTotal = getTotal + Number(bucket[group].models.civic_scores[total]);
          }
        }
        chartData.totals[group] = getTotal;
      }
    }
    chartData.series = this.getCivicActualAndPercentage(bucket, bucketList, chartData, true);
    chartData.percentage = this.getCivicActualAndPercentage(bucket, bucketList, chartData, false);
    chartData.categories = tempArray;
    return chartData;
  }

  getCivicActualAndPercentage(bucket: any, bucketList: any, chartData: any, forSeries: boolean): any[] {
    const results = [];
    for (const list of bucketList) {
      let changeForGraphQl = list.toLowerCase();
      changeForGraphQl = changeForGraphQl.replace(/ /g, '_');
      const tempObj: {name: string; data: any[]} = {name: list, data: []};
      for (const dataList of chartData.categories) {

        if (dataList !== '__typename') {
          if (forSeries) {
            tempObj.data.push(Number(bucket[dataList].models.civic_scores[changeForGraphQl] || 0));
          } else {
            tempObj.data.push(
              Math.floor(Number(
                ((Number(bucket[dataList].models.civic_scores[changeForGraphQl] || 0) / chartData.totals[dataList]) * 100),
              )),
            );
          }
        }
      }
      results.push(tempObj);
    }
    return results;
  }

  capitalize(s: any): any
  {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return s && s[0].toUpperCase() + s.slice(1);
  }

  selectionObjectConstruction(data: any): any {
    const tempObj: any = {};
    tempObj.people = data.totals.people;
    tempObj.households = data.totals.households;
    tempObj.score = data.totals.civic_score;
    tempObj.gender = data.indicators.gender;
    tempObj.age = data.indicators.age;
    tempObj.degree = data.indicators.degree;
    tempObj.income = data.indicators.income;
    tempObj.marital = data.indicators.marital;

    return tempObj;
  }
}
