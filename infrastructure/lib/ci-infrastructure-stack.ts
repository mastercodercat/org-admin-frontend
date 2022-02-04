import * as cdk from '@aws-cdk/core';
import { OpenIdConnectProvider, OpenIdConnectPrincipal, Role, ManagedPolicy} from '@aws-cdk/aws-iam';
import { join } from 'path';
import { CfnOutput, Duration } from '@aws-cdk/core';
import { CONSTANTS } from './config';
import {StringParameter} from '@aws-cdk/aws-ssm'


export interface ContinuousIntegrationInfrastructureStackProps extends cdk.StackProps {
  stage: string;
}

export class ContinuousIntegrationInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ContinuousIntegrationInfrastructureStackProps) {
    super(scope, id, props);

    const oidcProviderArn = StringParameter.fromStringParameterAttributes(this, `${CONSTANTS.stackPrefix}-oidc-provider-arn`, {
      parameterName: `/${props.stage}/shared/config/OIDC_PROVIDER_ARN`,
      // 'version' can be specified but is optional.
    }).stringValue;
    const oidcProvider = OpenIdConnectProvider.fromOpenIdConnectProviderArn(this, `${CONSTANTS.stackPrefix}-oidc-provider`,
        oidcProviderArn);
    const bitbucketPipelinesRole = new Role(this, `${CONSTANTS.stackPrefix}-bitbucket-pipelines-role`, {
      assumedBy: new OpenIdConnectPrincipal(oidcProvider),
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")],
      roleName: `${CONSTANTS.stackPrefix}-bitbucket-${props.stage.toLowerCase()}`
    });

  }
}
