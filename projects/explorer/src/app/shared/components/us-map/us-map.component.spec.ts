import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsMapComponent } from './us-map.component';

xdescribe('UsMapComponent', () => {
  let component: UsMapComponent;
  let fixture: ComponentFixture<UsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
