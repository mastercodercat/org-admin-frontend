#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { getDnsEnvironment } from '../lib/config';
import { FrontendStack  } from '../lib/frontend-infrastructure-stack';
import { DnsInfrastructureStack } from '../lib/dns-infrastructure-stack';
import { CONSTANTS } from '../lib/config';
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

const sandboxDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-sandbox`, getDnsEnvironment('sandbox'));

const sandboxApp = new FrontendStack(app, `${CONSTANTS.stackPrefix}-sandbox`, {
    env: CONSTANTS.sandbox,
    stage: 'sandbox',
    hostedZone: sandboxDns.domain,
})
