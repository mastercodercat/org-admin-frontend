/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Stack, StackProps, Construct, Arn } from '@aws-cdk/core';
import { CrossAccountZoneDelegationRecord, PublicHostedZone } from '@aws-cdk/aws-route53';
import { Role, AccountPrincipal, Effect, PolicyStatement} from '@aws-cdk/aws-iam';
import { CfnOutput, RemovalPolicy } from '@aws-cdk/core';


export interface DnsInfrastructureStackProps extends StackProps {
  domainName: string;
  trustedAccounts?: string[];
  parentDomainName?: string;
}


export class DnsInfrastructureStack extends Stack {
  public domain: PublicHostedZone;
  public delegationRole: string;
  constructor(scope: Construct, id: string, props: DnsInfrastructureStackProps) {
    super(scope, id, props);

    const delegateDns = props.parentDomainName !== undefined;
    const hostedZoneProps = {
      zoneName: `${props.domainName}`,
      crossAccountZoneDelegationPrincipal: props.trustedAccounts !== undefined
        ? new AccountPrincipal(props.trustedAccounts.pop()): undefined,
      crossAccountZoneDelegationRoleName: props.trustedAccounts !== undefined
        ? `helm-dns-delegation-role-${this.node.addr.substring(0,10) }`: undefined,
    };

    this.domain = new PublicHostedZone(this, 'helm-organizer-hosted-zone', hostedZoneProps);

    props.trustedAccounts?.map(element => {
      this.domain.crossAccountZoneDelegationRole?.assumeRolePolicy?.addStatements(
        new PolicyStatement({
          actions: ['sts:AssumeRole'],
          effect: Effect.ALLOW,
          principals: [new AccountPrincipal(element)],
        }),
      );
    });

    if (this.domain.crossAccountZoneDelegationRole !== undefined){
      this.delegationRole = this.domain.crossAccountZoneDelegationRole.roleName;

      const delegationRole = this.domain.crossAccountZoneDelegationRole;
      delegationRole.applyRemovalPolicy(RemovalPolicy.DESTROY);
      new CfnOutput(this, 'delegation-role-name', {
        value: this.domain.crossAccountZoneDelegationRole.roleName,
      });
    }

    if (delegateDns){
      new CrossAccountZoneDelegationRecord(this, 'helm-organizer-domain-delegation', {
        delegatedZone: this.domain,
        parentHostedZoneName: props.parentDomainName,
        delegationRole: Role.fromRoleArn(this, 'delegationrole', Arn.format({
          resource: 'role',
          service: 'iam',
          region: '',
          account: this.node.tryGetContext('sharedServices').dns.accountId,
          resourceName: this.node.tryGetContext('sharedServices').dns.delegationRoleName,
        }, this)),
      });
    }
  }
}
