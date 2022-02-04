import * as cdk from '@aws-cdk/core';
import {IFunction} from '@aws-cdk/aws-lambda'
import {HttpApi, HttpApiProps, CorsHttpMethod, DomainName, ApiMapping, HttpMethod, HttpNoneAuthorizer} from '@aws-cdk/aws-apigatewayv2'
import {LambdaProxyIntegration} from '@aws-cdk/aws-apigatewayv2-integrations';
import {HttpJwtAuthorizer, HttpJwtAuthorizerProps } from '@aws-cdk/aws-apigatewayv2-authorizers';
import {IHostedZone, ARecord, RecordTarget} from '@aws-cdk/aws-route53';
import {ApiGatewayv2DomainProperties} from '@aws-cdk/aws-route53-targets';
import {ICertificate} from '@aws-cdk/aws-certificatemanager';

export interface apiGatewayCustomDomainProps  {
    hostedZone: IHostedZone
    tlsCertificate: ICertificate
    subdomain?: string
}


export interface LambdaApiProps {
    defaultHandler: IFunction
    apiName?: string
    apiGatewayCustomDomainProps?: apiGatewayCustomDomainProps
    apiGatewayProps?: HttpApiProps
    authorizerProps?: HttpJwtAuthorizerProps
    corsAllowedOrigins?: string[]
}

// Note: this class uses @aws-cdk/aws-apigatewayv2, which is still in an experimental state.
// If you bump the version of that package, you may need to update the code here to match
// the new API.
export class LambdaApi extends cdk.Construct {
    public api: HttpApi;
    public apiGatewayUrl: ARecord | undefined;
    public authorizer: HttpJwtAuthorizer | undefined;
    constructor(scope: cdk.Construct, id: string, props: LambdaApiProps ) {
        super(scope, id);

        let apiGatewayProps: HttpApiProps;
        this.authorizer = props.authorizerProps !== undefined ? new HttpJwtAuthorizer(props.authorizerProps) : undefined;

        // When we encounter an un-configured route, throw a 404
        const defaultIntegration = new LambdaProxyIntegration({handler: props.defaultHandler})
        if(props.apiGatewayProps === undefined) {
            apiGatewayProps = {
                apiName: props.apiName,
                defaultAuthorizer: this.authorizer,
                defaultIntegration: defaultIntegration,
                corsPreflight: {
                    allowMethods: [
                        CorsHttpMethod.GET,
                        CorsHttpMethod.PUT,
                        CorsHttpMethod.POST,
                        CorsHttpMethod.DELETE
                    ],
                    allowOrigins: props.corsAllowedOrigins,
                    allowHeaders: ['*'],
                    exposeHeaders: ['origin'],
                    allowCredentials: false
                },
                createDefaultStage: true,
            };
        } else {
            apiGatewayProps = props.apiGatewayProps;
        }

        this.api = new HttpApi(this, 'HttpApiGateway', apiGatewayProps);

        // Catch all route to enable unauthenticated OPTIONS requests for APIs with a default authorizer.
        // If you don't have a default authorizer but you do want to serve OPTIONS requests for an endpoint
        // that does have one, you'll need to configure it explicitly.
        if (this.authorizer !== undefined){
            this.api.addRoutes({
                path: `/{proxy+}`,
                methods: [
                    HttpMethod.OPTIONS
                ],
                integration: defaultIntegration,
                authorizer: new HttpNoneAuthorizer()
            });
        }

        // Set custom domain name, if defined
        if (props.apiGatewayCustomDomainProps !== undefined) {
            const domainName = props.apiGatewayCustomDomainProps.subdomain !== undefined? `${props.apiGatewayCustomDomainProps.subdomain}.${props.apiGatewayCustomDomainProps.hostedZone.zoneName}`: props.apiGatewayCustomDomainProps.hostedZone.zoneName;
            const domain = new DomainName(this, 'ApiGatewayCustomDomain', {
                domainName: domainName,
                certificate: props.apiGatewayCustomDomainProps.tlsCertificate
            });
            new ApiMapping(this, 'ApiGatewayApiMapping', {
                api: this.api,
                domainName: domain
            });

            this.apiGatewayUrl =  new ARecord(this, 'APIGatewayAlias', {
                zone: props.apiGatewayCustomDomainProps.hostedZone,
                recordName: domainName,
                target: RecordTarget.fromAlias(new ApiGatewayv2DomainProperties(domain.regionalDomainName, domain.regionalHostedZoneId))
            });
        }

    }
}