#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppInfrastructureStack } from '../lib/app-infrastructure-stack';
import { exit } from 'process';
import { getAppEnvironment, getDnsEnvironment } from '../lib/config';
import { DnsInfrastructureStack } from '../lib/dns-infrastructure-stack';

const app = new cdk.App();

/*
Environment configurations

The AWS CDK recommends a mapping of one stack per environment (as opposed to a single stack deployed to multiple accounts).
To add a new stack, create an environment configuration similar to the one below, then add a new stack to the stacks section.
*/

/*
Stacks
*/

// Sandbox stack
try {
  const sandboxDns = new DnsInfrastructureStack(app, 'helm-organizer-frontend-dns-sandbox', getDnsEnvironment('sandbox'));
  const stagingDns = new DnsInfrastructureStack(app, 'helm-organizer-frontend-dns-staging', getDnsEnvironment('staging'));
  const productionDns = new DnsInfrastructureStack(app, 'helm-organizer-frontend-dns-production', getDnsEnvironment('production'));
  
  const sandboxApp = getAppEnvironment('sandbox');
  sandboxApp.publicHostedZone = sandboxDns.domain;
  const stagingApp = getAppEnvironment('staging');
  stagingApp.publicHostedZone = stagingDns.domain;
  const productionApp = getAppEnvironment('production');
  productionApp.publicHostedZone = productionDns.domain;

  const sandboxAppInfra = new AppInfrastructureStack(app, 'helm-organizer-frontend-sandbox', sandboxApp);
  const stagingAppInfra = new AppInfrastructureStack(app, 'helm-organizer-frontend-staging', stagingApp);
  const productionAppInfra = new AppInfrastructureStack(app, 'helm-organizer-frontend-production', productionApp);
  


} catch(err) {
  console.log(`Error launching stack: ${err}`)
  throw err;
  exit(1);
}
