import { Action } from '@ngrx/store';
import { loginReducer, initialState } from '../../store/reducers/login.reducer';

describe('Login Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const result = loginReducer(initialState, {} as Action);

      expect(result).toBe(initialState);
    });
  });
});
