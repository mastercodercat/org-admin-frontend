import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationSentComponent } from './invitation-sent.component';

describe('InvitationSentComponent', () => {
  let component: InvitationSentComponent;
  let fixture: ComponentFixture<InvitationSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
