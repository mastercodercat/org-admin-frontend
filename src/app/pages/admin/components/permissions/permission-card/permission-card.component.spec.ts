import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionCardComponent } from './permission-card.component';

describe('PermissionCardComponent', () => {
  let component: PermissionCardComponent;
  let fixture: ComponentFixture<PermissionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
