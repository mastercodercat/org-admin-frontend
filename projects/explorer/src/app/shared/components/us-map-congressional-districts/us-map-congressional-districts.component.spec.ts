import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsMapCongressionalDistrictsComponent } from './us-map-congressional-districts.component';

xdescribe('UsMapCongressionalDistrictsComponent', () => {
  let component: UsMapCongressionalDistrictsComponent;
  let fixture: ComponentFixture<UsMapCongressionalDistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsMapCongressionalDistrictsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsMapCongressionalDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
