#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ContinuousIntegrationInfrastructureStack } from '../lib/ci-infrastructure-stack';
import { getCiEnvironment, CONSTANTS } from '../lib/config';
import { exit } from 'process';


const app = new cdk.App();

/*
Environment configurations

The AWS CDK recommends a mapping of one stack per environment (as opposed to a single stack deployed to multiple accounts).
To add a new stack, create an environment configuration similar to the one below, then add a new stack to the stacks section.
*/


/*
Stacks
*/
new ContinuousIntegrationInfrastructureStack(app, `${CONSTANTS.stackPrefix}-ci-sandbox`, getCiEnvironment('sandbox'));
new ContinuousIntegrationInfrastructureStack(app, `${CONSTANTS.stackPrefix}-ci-staging`, getCiEnvironment('staging'));
new ContinuousIntegrationInfrastructureStack(app, `${CONSTANTS.stackPrefix}-ci-production`, getCiEnvironment('production'));