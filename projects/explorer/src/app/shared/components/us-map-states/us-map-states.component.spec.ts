import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsMapStatesComponent } from './us-map-states.component';

xdescribe('UsMapStatesComponent', () => {
  let component: UsMapStatesComponent;
  let fixture: ComponentFixture<UsMapStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsMapStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsMapStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
