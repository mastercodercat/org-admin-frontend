import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSentComponent } from './request-sent.component';

describe('RequestSentComponent', () => {
  let component: RequestSentComponent;
  let fixture: ComponentFixture<RequestSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
