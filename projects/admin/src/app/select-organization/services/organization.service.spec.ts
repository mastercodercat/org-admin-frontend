import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let spectator: SpectatorService<OrganizationService>;
  const createService = createServiceFactory(OrganizationService);

  beforeEach(() => (spectator = createService()));

  it('should get organizations', () => {
    expect(spectator.service.getOrganizations()).toBeTruthy();
  });

  it('should get users', () => {
    expect(spectator.service.getUsers()).toBeTruthy();
  });
});
