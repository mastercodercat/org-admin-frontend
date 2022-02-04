import * as cdk from '@aws-cdk/core';
import { CrossAccountZoneDelegationRecord, PublicHostedZone } from '@aws-cdk/aws-route53';
import { Role, CfnRole, AccountPrincipal, Effect, PolicyStatement} from '@aws-cdk/aws-iam';
import { Fn, CfnOutput, RemovalPolicy } from '@aws-cdk/core';
import { CONSTANTS } from './config';


export interface DnsInfrastructureStackProps extends cdk.StackProps {
  domainName: string;
  trustedAccounts?: string[]
  parentDomainName?: string
}


export class DnsInfrastructureStack extends cdk.Stack {
  public domain: PublicHostedZone;
  public delegationRole: string;
  constructor(scope: cdk.Construct, id: string, props: DnsInfrastructureStackProps) {
    super(scope, id, props);

    const delegateDns = props.parentDomainName !== undefined;
    const hostedZoneProps = {
      zoneName: `${props.domainName}`,
      crossAccountZoneDelegationPrincipal: props.trustedAccounts !== undefined ? new AccountPrincipal(props.trustedAccounts.pop()): undefined,
      crossAccountZoneDelegationRoleName: props.trustedAccounts !== undefined ? `helm-dns-delegation-role-${this.node.addr.substring(0,10)}`: undefined
    }

    this.domain = new PublicHostedZone(this, `${CONSTANTS.stackPrefix}-hosted-zone`, hostedZoneProps);

    this.domain.crossAccountZoneDelegationRole?.assumeRolePolicy?.addStatements(
      new PolicyStatement({
        actions: ['sts:AssumeRole'],
        effect: Effect.ALLOW,
        principals: props.trustedAccounts?.map(element => {
          return new AccountPrincipal(element)
        })
      })
    )

    if (this.domain.crossAccountZoneDelegationRole !== undefined){
      this.delegationRole = this.domain.crossAccountZoneDelegationRole.roleName;

      const cfnDelegationRole = this.domain.crossAccountZoneDelegationRole.node.defaultChild as CfnRole;
      cfnDelegationRole.applyRemovalPolicy(RemovalPolicy.DESTROY);
      new CfnOutput(this, 'delegation-role-name', {
        value: this.domain.crossAccountZoneDelegationRole.roleName
      })
    }

    if (delegateDns){
      new CrossAccountZoneDelegationRecord(this, `${CONSTANTS.stackPrefix}-domain-delegation`, {
        delegatedZone: this.domain,
        parentHostedZoneName: props.parentDomainName,
        delegationRole: Role.fromRoleArn(this, 'delegationrole', cdk.Arn.format({
          resource: 'role',
          service: 'iam',
          region: '',
          account: this.node.tryGetContext('sharedServices').dns.accountId,
          resourceName: this.node.tryGetContext('sharedServices').dns.delegationRoleName
        }, this))
      });
    }
  }
}