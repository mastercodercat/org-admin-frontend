#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { getDnsEnvironment } from '../lib/config';
import { FrontendStack  } from '../lib/frontend-infrastructure-stack';
import { DnsInfrastructureStack } from '../lib/dns-infrastructure-stack';
import { CONSTANTS } from '../lib/config';
const app = new cdk.App();

const sandboxDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-sandbox`, getDnsEnvironment('sandbox'));
const stagingDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-sandbox`, getDnsEnvironment('staging'));
const productionDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-sandbox`, getDnsEnvironment('production'));

const sandboxApp = new FrontendStack(app, `${CONSTANTS.stackPrefix}-sandbox`, {
    env: CONSTANTS.sandbox,
    stage: 'sandbox',
    hostedZone: sandboxDns.domain,
})

const stagingApp = new FrontendStack(app, `${CONSTANTS.stackPrefix}-sandbox`, {
  env: CONSTANTS.sandbox,
  stage: 'staging',
  hostedZone: stagingDns.domain,
})

const productionApp = new FrontendStack(app, `${CONSTANTS.stackPrefix}-sandbox`, {
  env: CONSTANTS.production,
  stage: 'production',
  hostedZone: productionDns.domain,
})

