jest.autoMockOff();

// @ts-ignore: missing from @types/jscodeshift :(
import { defineTest } from 'jscodeshift/dist/testUtils';

const TRANSFORM_NAME = 'index';

[
  'simple',
  'async',
  'implied-return',
  'multiline-body',
  'ignores-anonymous',
  'exported-named-binding',
].forEach(fixtureName =>
  defineTest(__dirname, TRANSFORM_NAME, null, fixtureName, { parser: 'ts' }),
);
