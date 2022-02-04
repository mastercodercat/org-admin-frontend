import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareChartsComponent } from './compare-charts.component';

describe('CompareChartsComponent', () => {
  let component: CompareChartsComponent;
  let fixture: ComponentFixture<CompareChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
