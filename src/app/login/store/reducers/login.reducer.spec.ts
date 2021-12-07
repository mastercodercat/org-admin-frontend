import { loginReducer, initialState } from '../../store/reducers/login.reducer';

describe('Login Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = loginReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
