import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySaveDrawerComponent } from './community-save-drawer.component';

describe('CommunitySaveDrawerComponent', () => {
  let component: CommunitySaveDrawerComponent;
  let fixture: ComponentFixture<CommunitySaveDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitySaveDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySaveDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
