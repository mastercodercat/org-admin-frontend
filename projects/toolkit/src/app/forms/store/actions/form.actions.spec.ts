import * as fromForm from './form.actions';

describe('[Form]Forms', () => {
  it('should return an action', () => {
    expect(fromForm.load().type).toBe('[Form] Load Forms');
  });
});
