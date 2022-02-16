import { domainsReducer, initialState } from './domains.reducer';

describe('Domains Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = domainsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
