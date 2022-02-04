import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoFiltersDrawerComponent } from './geo-filters-drawer.component';

xdescribe('GeoFiltersDrawerComponent', () => {
  let component: GeoFiltersDrawerComponent;
  let fixture: ComponentFixture<GeoFiltersDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoFiltersDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoFiltersDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
