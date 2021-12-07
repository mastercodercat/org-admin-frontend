#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DnsInfrastructureStack } from '../lib/dns-infrastructure-stack';
import { exit } from 'process';
import * as config from '../lib/config';

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
    // Defines top level domain. This stack will ultimately get moved into another repo,
  // but it can stay here for now till we get it a new home.
  const tldDnsStack = new DnsInfrastructureStack(app, 'helm-tld-shared', {
    env: config.production,
    domainName: 'helmahead.com',
    trustedAccounts: [
      config.production.account,
      config.staging.account,
      config.sandbox.account
    ]
  });

} catch(err) {
  console.log(`Error launching stack: ${err}`)
  exit(1);
}
