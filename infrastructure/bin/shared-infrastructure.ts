#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { DnsInfrastructureStack } from '../lib/dns-infrastructure-stack';
import { exit } from 'process';
import * as config from '../lib/config';

const app = new App();

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
  // Defines top level domain for preprod environments. This stack will ultimately get moved into another repo,
  // but it can stay here for now till we get it a new home.
  const preprodTldDnsStack = new DnsInfrastructureStack(app, 'helm-tld-shared', {
    env: config.production,
    domainName: 'helmahead.com',
    trustedAccounts: [
      config.production.account,
      config.staging.account,
      config.sandbox.account,
    ],
  });

  // Organizer.com top level domain.

  const prodTldDnsStack = new DnsInfrastructureStack(app, 'helm-organizer-tld-shared', {
    env: config.production,
    domainName: 'organizer.com',
    trustedAccounts: [
      config.production.account,
    ],
  });

  console.log(preprodTldDnsStack, prodTldDnsStack);

} catch(err) {
  if (err instanceof Error) {
    console.log(`Error launching stack: ${err.message}`);
  }
  exit(1);
}
