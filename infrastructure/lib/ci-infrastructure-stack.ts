import * as cdk from '@aws-cdk/core';
import { OpenIdConnectProvider, OpenIdConnectPrincipal, Role, ManagedPolicy} from '@aws-cdk/aws-iam';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { CfnOutput, Duration } from '@aws-cdk/core';


export interface ContinuousIntegrationInfrastructureStackProps extends cdk.StackProps {
  oidcProviderUrl: string;
  bitbucketWorkspaceIDs: string[];
  stage: string;
}

export class ContinuousIntegrationInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ContinuousIntegrationInfrastructureStackProps) {
    super(scope, id, props);

    // Resources
    const oidcProvider = new OpenIdConnectProvider(this, "helm-organizer-frontend-oidc-provider", {
      url: props.oidcProviderUrl,
      clientIds: props.bitbucketWorkspaceIDs
    });

    const providerArnParameter = new StringParameter(this, "helm-organizer-frontend-oidc-provider-parameter", {
      stringValue: oidcProvider.openIdConnectProviderArn,
      parameterName: `/${props.stage}/shared/config/OIDC_PROVIDER_ARN`
    });

    const bitbucketPipelinesRole = new Role(this, "helm-organizer-frontend-bitbucket-pipelines-role", {
      assumedBy: new OpenIdConnectPrincipal(oidcProvider),
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")],
      roleName: `helm-bitbucket-${props.stage.toLowerCase()}`
    });

    new CfnOutput(this, "pipeline-role", {
      value: bitbucketPipelinesRole.roleArn,
      description: "ARN for the bitbucket pipelines role"
    });
  }
}