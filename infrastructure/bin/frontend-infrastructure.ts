#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { getDnsEnvironment } from '../lib/config';
import { FrontendStack  } from '../lib/frontend-infrastructure-stack';
import { DnsInfrastructureStack } from '../lib/dns-infrastructure-stack';
import { CONSTANTS } from '../lib/config';
const app = new cdk.App();

const sandboxDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-sandbox`, getDnsEnvironment('sandbox'));
const stagingDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-staging`, getDnsEnvironment('staging'));
const productionDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-production`, getDnsEnvironment('production'));

const sandboxApp = new FrontendStack(app, `${CONSTANTS.stackPrefix}-sandbox`, {
    env: CONSTANTS.sandbox,
    stage: 'sandbox',
    hostedZone: sandboxDns.domain,
})

const stagingApp = new FrontendStack(app, `${CONSTANTS.stackPrefix}-staging`, {
  env: CONSTANTS.staging,
  stage: 'staging',
  hostedZone: stagingDns.domain,
})

const productionApp = new FrontendStack(app, `${CONSTANTS.stackPrefix}-production`, {
  env: CONSTANTS.production,
  stage: 'production',
  hostedZone: productionDns.domain,
})

