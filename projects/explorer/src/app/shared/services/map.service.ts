import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AllDataGQL } from './map-charts.generated';
import { ChartDataGQL } from './bar-charts.generated';
import * as Apollo from 'apollo-angular';
import { ChartDataGqlService } from './chart-data-gql.service';

@Injectable({
  providedIn: 'root',
})


export class MapService {
  private apiUrl: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private allData: AllDataGQL,
    private chartDataGQL: ChartDataGQL,
    private apollo: Apollo.Apollo,
    private ChartDataGql: ChartDataGqlService,
  ) {

    if (environment.apiURL === '{PLACEHOLDER}') {
      switch (window.location.hostname) {
        case 'login.civicexplorer.com':
          this.apiUrl = 'https://production.explorer.organizer.helmahead.com';
          break;
        case 'staging-www.civicexplorer.com':
          this.apiUrl = 'https://staging.explorer.organizer.helmahead.com';
          break;
        case 'sandbox-www.civicexplorer.com':
          this.apiUrl = 'https://sandbox.explorer.organizer.helmahead.com';
          break;
      }
    }
  }

  getStateData(): Observable<any> {
    return this.apollo.use('explorer').watchQuery<any>({query: this.ChartDataGql.stateData}).valueChanges.pipe(map(res => {
      const tempVal = res.data;
      const finalVersion: {states: any} = {states: ''};
      const tempHolder = tempVal.states.map((data: any) => ({
        id: data.segment,
        code: data.segment.replace('US-', ''),
        name: data.state,
        value: data.totals.civic_score,
        people: data.totals.people,
        households: data.totals.households,
        category: 'state',
      }));
      finalVersion.states = tempHolder;
      return finalVersion.states;
    }));
  }

  getCountyData(selecetedMap: string, selected: string, filters?: string | null): Observable<any> {
    return this.apollo.use('explorer').watchQuery<any>({
      query: this.ChartDataGql.multMapData,
      variables: {level: selecetedMap, segment: { state: selected}}})
      .valueChanges.pipe(map(res => res));
  }

  getAllAllData(): Observable<any> {
    return this.allData.watch().valueChanges.pipe(map((res: any) => {
      const tempVal = res.data;
      const finalVersion: {counties: any; countries: any; states: any} = {counties: '', countries: '', states: ''};
      let tempHolder;
      tempHolder = tempVal.county.map((data: any) => ({
        id: data.segment,
        code: data.segment.toLowerCase(),
        name: data.county,
        value: data.totals.civic_score,
        people: data.totals.people,
        households: data.totals.households,
        state: data.state,
        category: 'county',
      }));
      finalVersion.counties = tempHolder;
      tempHolder = tempVal.state.map((data: any) => ({
        id: data.segment,
        code: data.segment.replace('US-', ''),
        name: data.state,
        value: data.totals.civic_score,
        people: data.totals.people,
        households: data.totals.households,
        category: 'state',
      }));
      finalVersion.states = tempHolder;
      tempHolder = tempVal.national.map((data: any) => ({
        id: data.segment,
        name: data.segment,
        score: data.totals.civic_score,
        people: data.totals.people,
        households: data.totals.households,
        gender: data.indicators.gender,
        age: data.indicators.age,
        degree: data.indicators.degree,
        income: data.indicators.income,
        category: 'country',
      }));
      finalVersion.countries = tempHolder;
      return finalVersion;
    }));
  }

  getAllChartData(segment: any | undefined, level?: string | null, filters?: string | null): Observable<any>{
    const abortController = new AbortController();
    return this.apollo.use('explorer').watchQuery<any>
    ({
      query: this.ChartDataGql.chartDataGQL,
      variables: {level, segment, include: filters},
      context: { fetchOptions: { signal: abortController.signal }, queryDeduplication: false}})
      .valueChanges.pipe(map(res => res));
  }

  getAllChartDataNational(filters: any): Observable<any>{
    const abortController = new AbortController();
    return this.apollo.use('explorer').watchQuery<any>
    ({
      query: this.ChartDataGql.chartDataNational,
      variables: {include: filters},
      context: { fetchOptions: { signal: abortController.signal }, queryDeduplication: false}})
      .valueChanges.pipe(map(res => res));
  }

  getSearchData(input: any): Observable<any> {
    return this.apollo.use('explorer').watchQuery<any>({
      query: this.ChartDataGql.searchData,
      variables: {input: {term: input}}})
      .valueChanges.pipe(map(res => res));
  }
}
