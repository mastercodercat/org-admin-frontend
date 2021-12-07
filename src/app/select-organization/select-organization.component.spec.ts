import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { SelectOrganizationComponent } from './select-organization.component';

describe('SelectOrganizationComponent', () => {
  let component: SelectOrganizationComponent;
  let fixture: ComponentFixture<SelectOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOrganizationComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
