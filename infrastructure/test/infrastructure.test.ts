/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import * as Infrastructure from '../lib/app-infrastructure-stack';

test('Empty Stack', () => {
  const app = new App();
  // WHEN
  const stack = new Infrastructure.AppInfrastructureStack(app, 'MyTestStack', {} as Infrastructure.AppInfrastructureStackProps);
  // THEN
  expectCDK(stack).to(matchTemplate({
    Resources: {},
  }, MatchStyle.EXACT));
});
