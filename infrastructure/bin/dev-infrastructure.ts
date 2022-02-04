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

const appConfig = getAppEnvironment('sandbox');
appConfig.isDevelopment = true;
const appInfra = new AppInfrastructureStack(app, `${CONSTANTS.stackPrefix}-sandbox`, appConfig);