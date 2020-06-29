jest.autoMockOff();

import { defineTest } from 'jscodeshift/dist/testUtils';

const TRANSFORM_NAME = 'index';

[
  'simple',
].forEach(fixtureName => defineTest(
  __dirname,
  TRANSFORM_NAME,
  null,
  fixtureName,
  { parser: 'ts' },
));
