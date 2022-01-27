#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { ContinuousIntegrationInfrastructureStack } from '../lib/ci-infrastructure-stack';
import { getCiEnvironment } from '../lib/config';
import { exit } from 'process';


const app = new App();

/*
Environment configurations

The AWS CDK recommends a mapping of one stack per environment (as opposed to a single stack deployed to multiple accounts).
To add a new stack, create an environment configuration similar to the one below, then add a new stack to the stacks section.
*/


/*
Stacks
*/
try {
  new ContinuousIntegrationInfrastructureStack(app, 'helm-organizer-frontend-ci-sandbox', getCiEnvironment('sandbox'));
  new ContinuousIntegrationInfrastructureStack(app, 'helm-organizer-frontend-ci-staging', getCiEnvironment('staging'));
  new ContinuousIntegrationInfrastructureStack(app, 'helm-organizer-frontend-ci-production', getCiEnvironment('production'));
} catch(err) {
  if (err instanceof Error) {
    console.log(`Error launching stack: ${err.message}`);
  }
  exit(1);
}
