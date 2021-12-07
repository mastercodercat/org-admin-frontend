import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRolesComponent } from './assign-roles.component';

describe('AssignRolesComponent', () => {
  let component: AssignRolesComponent;
  let fixture: ComponentFixture<AssignRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
