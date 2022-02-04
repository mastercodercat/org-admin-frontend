import * as cdk from '@aws-cdk/core';
import * as frontend from './constructs/cloudfront-s3-frontend';
import {DnsValidatedCertificate, CertificateValidation} from '@aws-cdk/aws-certificatemanager';
import {IHostedZone, PublicHostedZone} from '@aws-cdk/aws-route53';
import { Source } from '@aws-cdk/aws-s3-deployment';
import path = require('path')


export interface FrontendStackProps extends cdk.StackProps {
  stage: string
  hostedZone?: PublicHostedZone
  domainName?: string
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

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


    let customDomainProps: frontend.CustomDomainProps | undefined;

    if (cert !== undefined && props.hostedZone !== undefined){
      customDomainProps = {
        certificate: cert,
        hostedZone: props.hostedZone,
        domainNames: props.domainName !== undefined? [props.domainName]:  [props.hostedZone.zoneName]
      };
    }

    new frontend.SinglePageApp(this, 'site', {
//      uploadPrefix: process.env.BITBUCKET_COMMIT,
      angularOutputDirectory: path.join(__dirname, '../../dist/organizer-frontends'),
      customDomainProps: customDomainProps
    })
  }
}
