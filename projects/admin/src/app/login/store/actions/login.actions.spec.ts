import * as fromLogin from '../../store/actions/login.actions';

describe('loginSuccess', () => {
  it('should return an action', () => {
    expect(fromLogin.loginSuccess().type).toBe('[Login] Login success');
  });
});
