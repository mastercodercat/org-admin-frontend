import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCollapseComponent } from './account-collapse.component';

describe('AccountCollapseComponent', () => {
  let component: AccountCollapseComponent;
  let fixture: ComponentFixture<AccountCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountCollapseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
