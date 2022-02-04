import * as cdk from '@aws-cdk/core';
import {Bucket, BucketAccessControl} from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import { HostedZone, ARecord, RecordTarget, PublicHostedZone } from '@aws-cdk/aws-route53';
import { CloudFrontTarget} from '@aws-cdk/aws-route53-targets';
import { DnsValidatedCertificate, CertificateValidation, CfnCertificate, ICertificate } from '@aws-cdk/aws-certificatemanager'
import {Distribution, AllowedMethods, CachePolicy, CachedMethods, ViewerProtocolPolicy} from '@aws-cdk/aws-cloudfront'
import * as CFOrigin from '@aws-cdk/aws-cloudfront-origins'
import { join } from 'path';
import { CfnOutput, Duration, RemovalPolicy } from '@aws-cdk/core';
import { Source } from '@aws-cdk/aws-s3-deployment';


export interface CustomDomainProps {
  hostedZone: PublicHostedZone,
  domainNames: string[],
  certificate: ICertificate,
}
export interface SinglePageAppProps  {
  customDomainProps?: CustomDomainProps,
  uploadPrefix?: string,
  angularOutputDirectory: string,
}

export class SinglePageApp extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: SinglePageAppProps) {
    super(scope, id);

    // Resources:
    // Log aggregation bucket (CloudFront logs go here)
    const logsBucket = new Bucket(this, 'LogBucket', {
      accessControl: BucketAccessControl.LOG_DELIVERY_WRITE,
      removalPolicy: cdk.RemovalPolicy.RETAIN // Keep server logs in the event that the stack gets deleted
    })

    const site = Source.asset(props.angularOutputDirectory, {
      exclude: ['index.html']
    })

    const rootDocument = Source.asset(props.angularOutputDirectory, {
      exclude: ['**', '!index.html']
    })

    // Site bucket (build artifacts get uploaded here)
    const siteBucket = new Bucket(this, 'SiteBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      enforceSSL: true,
      publicReadAccess: false,
      serverAccessLogsBucket: logsBucket,
    });

    // Uploads angular build output to S3, prefixed with the uploadPrefix tag for the deploy
    const siteUpload = new s3Deploy.BucketDeployment(this, 'SiteUpload', {
      destinationBucket: siteBucket,
      sources: [site],
      prune: false, // Don't delete existing files when uploading
      destinationKeyPrefix: props.uploadPrefix,
      memoryLimit: 1024
    });

    // Upload index to bucket root
    const indexUpload = new s3Deploy.BucketDeployment(this, 'RootDocumentUpload', {
      destinationBucket: siteBucket,
      sources: [rootDocument],
      cacheControl: [s3Deploy.CacheControl.fromString('max-age=0,no-cache,no-store,must-revalidate')],
      prune: false
    });

    // Ensure the new site is uploaded before uploading the index
    indexUpload.node.addDependency(siteUpload)


    // Configure CloudFront to request files from the site bucket
    // The angular app will determine the prefix to request files from
    const origin = new CFOrigin.S3Origin(siteBucket,{
      originPath: `/`
    });

    // Cloudfront CDN
    const cdn = new Distribution(this, 'Cdn', {
      enableLogging: true,
      logBucket: logsBucket,
      certificate: props.customDomainProps?.certificate,
      domainNames:  props.customDomainProps?.domainNames,
      defaultBehavior: {
        origin: origin,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: new CachePolicy(this, 'DefaultCachePolicy', {}),
        cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      additionalBehaviors: {
        // Don't cache index.html
        "index.html": {
          origin: origin,
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachePolicy: new CachePolicy(this, 'IndexCachePolicy', {
            minTtl: Duration.seconds(0),
            maxTtl: Duration.seconds(0),
            defaultTtl: Duration.seconds(0)

          }),
          cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
        }
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403, // S3 API returns 403 instead of 404 for missing files, so we need to return 200 here and allow angular's router to do its thing
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        },
        {
          httpStatus: 500,
          responsePagePath: '/index.html'
        }
      ]
    });

    props.customDomainProps !== undefined ? new ARecord(this, 'CdnRecord', {
      target: RecordTarget.fromAlias(new CloudFrontTarget(cdn)),
      zone: props.customDomainProps.hostedZone
    }) : console.log('No public hosted zone defined, skipping DNS record creation');
    cdn.node.addDependency(indexUpload);

    // Outputs
    new CfnOutput(this, 'SiteBucketName', {
     value: siteBucket.bucketName,
     description: 'Bucket where static assets are uploaded',
    })

    new CfnOutput(this, 'CdnDomainName', {
      value: cdn.domainName,
      description: 'Domain name for the CloudFront distribution (to access the site without a custom URL)',
     })

     new CfnOutput(this, 'DomainName', {
      value: props.customDomainProps?.domainNames.join(',') || cdn.domainName,
      description: 'Domain name(s) for the site',
     })

     new CfnOutput(this, 'LogBucketName', {
      value: logsBucket.bucketName,
      description: 'Domain name for the site',
     })
  }
}