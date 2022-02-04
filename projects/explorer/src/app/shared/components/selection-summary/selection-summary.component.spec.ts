import { createComponentFactory } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';
import { ThousandSuffixesPipe } from '../../pipes/thousand-suff.pipe';
import { SelectionSummaryComponent } from './selection-summary.component';

describe('SelectionSummaryComponent', () => {
  const createComponent = createComponentFactory({
    component: SelectionSummaryComponent,
    declarations: [
      MockPipe(ThousandSuffixesPipe)
    ],
  });

  const props = {
    households: 1,
    people: 2,
    name: 'test',
    score: 0.4
  };

  it('should create', () => {
    const spectator = createComponent({ props: props });

    expect(spectator).toBeTruthy();
  });

  it('should change isFiltersApplied to true when filters are applied', () => {
    const spectator = createComponent({ props: props });

    expect(spectator.component.isFiltersApplied).toBeFalsy();
    
    spectator.component.filtersChanged([1,2,3]);
    
    expect(spectator.component.isFiltersApplied).toBeTruthy();
  });

  it('should emit the event filterChange', () => {
    const spectator = createComponent({ props: props });

    let output: any;
    spectator.output<number[]>('filterChange').subscribe(result => output = result);

    spectator.component.filtersChanged([1, 2, 3]);

    spectator.detectChanges();
    expect(output).toEqual([1,2,3]);
  });

  it('should emit the event toggleGeoFilter', () => {
    const spectator = createComponent({ props: props });
    spyOn(spectator.component.toggleGeoFilter, 'emit');

    spectator.component.toggleFilterPanel();

    expect(spectator.component.toggleGeoFilter.emit).toHaveBeenCalled();
  });
});

