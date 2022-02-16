import * as fromDomains from './domains.actions';

describe('loadDomains', () => {
  it('should return an action', () => {
    expect(fromDomains.loadDomains().type).toBe('[Domains] Load Domainss');
  });
});
