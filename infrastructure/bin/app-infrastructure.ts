#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppInfrastructureStack } from '../lib/app-infrastructure-stack';
import { exit } from 'process';
import { getAppEnvironment, getDnsEnvironment } from '../lib/config';
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
const stagingDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-staging`, getDnsEnvironment('staging'));
const productionDns = new DnsInfrastructureStack(app, `${CONSTANTS.stackPrefix}-dns-production`, getDnsEnvironment('production'));


const sandboxAppConfig = getAppEnvironment('sandbox');
sandboxAppConfig.hostedZone = sandboxDns.domain;
const sandboxAppInfra = new AppInfrastructureStack(app, `${CONSTANTS.stackPrefix}-sandbox`, sandboxAppConfig);

const stagingAppConfig = getAppEnvironment('staging');
stagingAppConfig.hostedZone = stagingDns.domain;
const stagingAppInfra = new AppInfrastructureStack(app, `${CONSTANTS.stackPrefix}-staging`, stagingAppConfig);

const productionAppConfig = getAppEnvironment('production');
productionAppConfig.hostedZone = productionDns.domain;
const productionAppInfra = new AppInfrastructureStack(app, `${CONSTANTS.stackPrefix}-production`, productionAppConfig);
