import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionToolTagboxComponent } from './selection-tool-tagbox.component';

describe('SelectionToolTagboxComponent', () => {
  let component: SelectionToolTagboxComponent;
  let fixture: ComponentFixture<SelectionToolTagboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionToolTagboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionToolTagboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
