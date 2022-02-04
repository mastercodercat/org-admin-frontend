import { ContinuousIntegrationInfrastructureStackProps } from './ci-infrastructure-stack';
import { AppInfrastructureStackProps } from './app-infrastructure-stack';
import { DnsInfrastructureStackProps } from './dns-infrastructure-stack';
/*
    This module generates stack properties by merging "global" stack properties
    with stack-specific props. To add a property shared across all stacks,
    add a constant below. To add a property specific to a CI or
    App Infrastructure stack, put it in getCiEnvironment or getAppEnvironment,
    respectively.
*/

const domain = 'helmahead.com';
const subdomain = 'organizer'; // TODO: This will work for all organizer related services.

export const CONSTANTS = {
    sandbox:  { account: '552593679126', region: 'us-east-1' },
    staging:  { account: '343567461217', region: 'us-east-1' },
    production:  { account: '020931949237', region: 'us-east-1' },
    tld: domain,
    subdomain:  `${subdomain}.${domain}`,
    version: process.env.BITBUCKET_COMMIT || 'latest',
    serviceName: 'front', // TODO: Change me to service name
    stackPrefix: 'HelmOrganizerFrontends', // TODO: Change me and match me in bitbucketpipeline
};

export function getCiEnvironment(stage: string): ContinuousIntegrationInfrastructureStackProps {
    // CI specific stack properties

    const environmentForStage: {[key:string]: ContinuousIntegrationInfrastructureStackProps} = {
        sandbox: {
            env: CONSTANTS.sandbox,
            stage: 'sandbox'
        },
        staging: {
            env: CONSTANTS.staging,
            stage: 'staging'
        },
        production: {
            env: CONSTANTS.production,
            stage: 'production'
        },
    };

    if (environmentForStage[stage] === undefined) {
        throw `No configuration found for ${stage}!`;
    }

    return environmentForStage[stage];
}


export function getAppEnvironment(stage: string): AppInfrastructureStackProps {
    // Infrastructure stack properties
    const vpcLookupParameter = `/${stage}/shared/config/ORGANIZER_VPC_ID`;
    const environmentForStage: {[key:string]: AppInfrastructureStackProps} = {
        sandbox: {
            env: CONSTANTS.sandbox,
            stage: 'sandbox',
        },
        staging: {
            env: CONSTANTS.staging,
            stage: 'staging',
        },
        production: {
            env: CONSTANTS.production,
            stage: 'production',
        },
    };


    if (environmentForStage[stage] === undefined) {
        throw `No configuration found for ${stage}!`;
    }

    return environmentForStage[stage];

}

export function getDnsEnvironment(stage: string): DnsInfrastructureStackProps {
    // Infrastructure stack properties
    const environmentForStage: {[key:string]: DnsInfrastructureStackProps} = {
        shared: {
            domainName: CONSTANTS.subdomain
        },
        sandbox: {
            env: CONSTANTS.sandbox,
            domainName: `sandbox.${CONSTANTS.serviceName}.${CONSTANTS.subdomain}`,
            parentDomainName: CONSTANTS.tld
        },
        staging: {
            env: CONSTANTS.staging,
            domainName: `staging.${CONSTANTS.serviceName}.${CONSTANTS.subdomain}`,
            parentDomainName: CONSTANTS.tld
        },
        production: {
            env: CONSTANTS.production,
            domainName: `${CONSTANTS.serviceName}.${CONSTANTS.subdomain}`,
            parentDomainName: CONSTANTS.tld
        },
    };

    if (environmentForStage[stage] === undefined) {
        throw `No configuration found for ${stage}!`;
    }

    return environmentForStage[stage];

}
