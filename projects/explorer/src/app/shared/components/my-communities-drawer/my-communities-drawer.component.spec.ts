import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommunitiesDrawerComponent } from './my-communities-drawer.component';

describe('MyCommunitiesDrawerComponent', () => {
  let component: MyCommunitiesDrawerComponent;
  let fixture: ComponentFixture<MyCommunitiesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCommunitiesDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommunitiesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
