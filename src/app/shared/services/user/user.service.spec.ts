import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule,
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    localStorage.setItem('access_token', 'somerandomtoken');
    expect(service).toBeTruthy();
  });
});
