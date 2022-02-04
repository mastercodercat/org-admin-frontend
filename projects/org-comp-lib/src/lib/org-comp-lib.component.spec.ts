import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCompLibComponent } from './org-comp-lib.component';

describe('OrgCompLibComponent', () => {
  let component: OrgCompLibComponent;
  let fixture: ComponentFixture<OrgCompLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgCompLibComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCompLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
