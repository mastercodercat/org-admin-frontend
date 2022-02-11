import * as fromDomains from './domains.actions';

describe('loadDomainss', () => {
  it('should return an action', () => {
    expect(fromDomains.loadDomainss().type).toBe('[Domains] Load Domainss');
  });
});
