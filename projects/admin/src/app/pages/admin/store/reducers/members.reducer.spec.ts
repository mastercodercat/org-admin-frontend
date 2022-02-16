import { membersReducer, initialState } from './members.reducer';

describe('Members Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = membersReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
