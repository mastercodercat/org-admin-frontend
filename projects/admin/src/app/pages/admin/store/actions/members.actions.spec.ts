import * as fromMembers from './members.actions';

describe('loadMembers', () => {
  it('should return an action', () => {
    expect(fromMembers.loadMembers().type).toBe('[Members] Load Members');
  });
});
