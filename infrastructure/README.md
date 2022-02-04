# Infrastructure Scaffold
This project contains 3 CDK applications:

- [`ci-infrastructure`](./bin/ci-infrastructure.ts) creates resources needed to deploy this project from CI. 
- [`app-infrastructure`](./bin/app-infrastructure.ts) creates the infrastructure for an API Gateway with a couple of lambda-backed endpoints, as defined in [`lib/app-infrastructure-stack.ts`](./lib/app-infrastructure-stack.ts).
- [`frontend-infrastructure`](./bin/frontend-infrastructure.ts) creates the infrastructure for a angular single page app, as defined in [`lib/frontend-infrastructure-stack.ts`](./lib/frontend-infrastructure-stack.ts).


## How to use this project
- set the following values in [`lib/config.ts`](./lib/config.ts):
    - CONSTANTS.subdomain
    - CONSTANTS.serviceName
    - CONSTANTS.stackPrefix
        - Take a note of the stack prefix, it'll be used later!
- Add some CDK code to create AWS resources in [`lib/app-infrastructure-stack.ts`](./lib/app-infrastructure-stack.ts).
- Push your changes to CI, or push your changes to AWS by doing a [local deployment](#local-usage).
- Your service will be available at https://${STAGE}.${SERVICE}.${SUBDOMAIN}.helmahead.com, substituting your environment for `STAGE`, the value of `CONSTANTS.serviceName` for `SERVICE`, and the name of the top level application (i.e. organizer), for `SUBDOMNAIN`.


# Setting up Application infrastructure for a new environment
- If necessary, add shared services information to `cdk.context.json` under the `sharedServices` object.
- Add any sensitive configuration valeus as environment variables in your bitbucket pipeline.
- (Optional, if this hasn't already been done): Add the environment's stack properties in [`lib/config.ts`](./lib/config.ts)
    - add your environment's settings in `getApplicationEnvironment`
- Configure the `AppInfrastructureStack` in [`lib/app-infrastructure-stack.ts`](./lib/app-infrastructure-stack.ts) to add AWS resources. Either instantiate one of the highter level constructs in `lib/constructs`, or create some resources of your own. The included example creates an API Gateway with a default authorizer and `/graphql` endpoint that uses a Lambda integration.
    - For sensitive values like DB credentials, pull them from the environment using `process.env.ENV_VAR_NAME`, substituting `ENV_VAR_NAME` for the environment variable you wish to access. Then, make sure the required env variables are set in your bitbucket pipeline.
- In `bitbucket-pipelines.yml`, add a step to deploy the application for your stage.
    - First, in the `definitions` section, find the deployment step for your stage. It inherits from `*deploy-base`, and should be named `deploy-${STAGE}`, where `${STAGE}` is the name of your deployment environment.
    - Update the deploy command to deploy the `AppInfrastructureStack` configured in your CDK project. You should update the `-t` command, changing the name of your stack to the value of `CONSTANTS.stackPrefix` from the previous section.
        - You can also get the stack prefix by running this commandfrom the infrastructure directory/:
        ```bash
        # npx ts-node -O '{"module": "commonjs"}' -e 'import {CONSTANTS} from "./lib/config"; console.log(CONSTANTS.stackPrefix);'
        ```
        - Deploying the `AppInfrastructureStack` will deploy any dependent stacks, including DNS.
    - Once your changes are merged in, they'll be deployed automatically.
## Local Usage
- (Optional: frontends only) Run `npm i` and `npm build` from the parent directory to build the asset bundle.
- Set your AWS credentials in the environment.
    - ***Note: using SSO + named profiles from the CLI does not work per https://github.com/aws/aws-cdk/issues/5455. That issue has a variety of workarounds, but the core concept is to extract your temporary credentials from `~/.aws/cli/cache` and export them into the environment (or profile in `~/.aws/config`). In general, though, there should be no reason to run this command locally once CI is wired up.***
- In the infrastructure directory, run `npm i --save-dev` to install the CDK and deployment dependencies.
- From the parent directory, run `bin/deploy -s ${STAGE} -t ${STACK} -a ${APP}`, where:
    - STAGE is the environment to deploy, i.e. sandbox, staging, production, etc.
    - STACK is the name of the stack you want to deploy, without the `STAGE` suffix (i.e. `helm-organizer-dns`, `helm-organizer-frontend`).
        - By default, the name of the application infrastructure stack is the same as `config.CONSTANTS.stackPrefix` in the CDK app. You can get the stack prefix by running this command:
        ```bash
        # npx ts-node -O '{"module": "commonjs"}' -e 'import {CONSTANTS} from "./lib/config"; console.log(CONSTANTS.stackPrefix);'
        ```
    - APP is the CDK app that contains your stacks. This should be the name of a CDK app file in `infrastructure/bin/`, i.e. `app-infrastructure`, or `shared-infrastructure`.

## TODOS
- Implement application infrastructure constructs
    - Lambda with Postgres
    - Lambda-backed SQS
- Examples:
    - Using/storing context
- Architecture diagrams


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
