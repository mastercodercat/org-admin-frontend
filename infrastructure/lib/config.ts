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

export const sandbox = { account: '552593679126', region: 'us-east-1' };
export const sandbox2 = { account: '552593679126', region: 'us-east-1' };
export const staging = { account: '343567461217', region: 'us-east-1' };
export const production = { account: '020931949237', region: 'us-east-1' };
export const tld = 'helmahead.com';
const version = process.env.BITBUCKET_COMMIT || 'latest';

export function getCiEnvironment(stage: string): ContinuousIntegrationInfrastructureStackProps {
    // CI specific stack properties

    // BitBucket workspaces allowed to assume the role
    const bitbucketWorkspaceIDs = [
        'ari:cloud:bitbucket::workspace/f6b518b1-465f-4baa-94e6-f864a8f5b6a3'
    ];

    // OIDC Provider URL
    const bitbucketProviderUrl = 'https://api.bitbucket.org/2.0/workspaces/elite50/pipelines-config/identity/oidc';


    const environmentForStage: {[key:string]: ContinuousIntegrationInfrastructureStackProps} = {
        sandbox: {
            env: sandbox,
            oidcProviderUrl: bitbucketProviderUrl,
            bitbucketWorkspaceIDs: bitbucketWorkspaceIDs,
            stage: 'sandbox'
        },
        staging: {
            env: staging,
            oidcProviderUrl: bitbucketProviderUrl,
            bitbucketWorkspaceIDs: bitbucketWorkspaceIDs,
            stage: 'staging'
        },
        production: {
            env: production,
            oidcProviderUrl: bitbucketProviderUrl,
            bitbucketWorkspaceIDs: bitbucketWorkspaceIDs,
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
    const environmentForStage: {[key:string]: AppInfrastructureStackProps} = {
        sandbox: {
            env: sandbox,
            bucketName: 'sandbox-beta.organizer.com',
            version: version
        },
        staging: {
            env: staging,
            bucketName: 'staging-beta.organizer.com',
            version: version
        },
        production: {
            env: production,
            bucketName: 'beta.organizer.com',
            version: version
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
            domainName: `organizer.${tld}`
        },
        sandbox: {
            env: sandbox,
            domainName: `sandbox.app.organizer.${tld}`,
            parentDomainName: tld
        },
        staging: {
            env: staging,
            domainName: `staging.app.organizer.${tld}`,
            parentDomainName: tld
        },
        production: {
            env: production,
            domainName: `app.organizer.${tld}`,
            parentDomainName: tld
        },
    };

    if (environmentForStage[stage] === undefined) {
        throw `No configuration found for ${stage}!`;
    }

    return environmentForStage[stage];

}