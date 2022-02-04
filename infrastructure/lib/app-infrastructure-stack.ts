import * as cdk from '@aws-cdk/core';
import * as lambdaWithApiGateway from './constructs/lambda-backed-api-gateway';
import { DockerImageCode, DockerImageFunction } from '@aws-cdk/aws-lambda';
import {DnsValidatedCertificate, CertificateValidation} from '@aws-cdk/aws-certificatemanager';
import { Vpc, SubnetType } from '@aws-cdk/aws-ec2';
import { StringParameter } from '@aws-cdk/aws-ssm';
import path = require('path')
import { IHostedZone } from '@aws-cdk/aws-route53';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { HttpMethod, HttpNoneAuthorizer } from '@aws-cdk/aws-apigatewayv2';
import { Duration } from '@aws-cdk/core';

export interface AppInfrastructureStackProps extends cdk.StackProps {
  stage: string
  hostedZone?: IHostedZone
  domainName?: string
  isDevelopment?: boolean
}

export class AppInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AppInfrastructureStackProps) {
    super(scope, id, props);

    const isDevelopment = props.isDevelopment? props.isDevelopment: false

    const cert = props.hostedZone !== undefined ? new DnsValidatedCertificate(this, 'ssl-certificate',
        {
          domainName: props.domainName !== undefined? props.domainName: props.hostedZone.zoneName,
          hostedZone: props.hostedZone,
          validation: CertificateValidation.fromDns(props.hostedZone),
          subjectAlternativeNames: [
            `*.${props.hostedZone.zoneName}`
          ]
        }
      ) : undefined;
  }
}
