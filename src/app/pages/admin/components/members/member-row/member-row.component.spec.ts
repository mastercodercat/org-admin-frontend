import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { MemberRowComponent } from './member-row.component';

describe('MemberRowComponent', () => {
  let component: MemberRowComponent;
  let fixture: ComponentFixture<MemberRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberRowComponent],
      imports: [
        NzDropDownModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
