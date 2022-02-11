import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageDomainsComponent } from './landing-page-domains.component';

describe('LandingPageDomainsComponent', () => {
  let component: LandingPageDomainsComponent;
  let fixture: ComponentFixture<LandingPageDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
