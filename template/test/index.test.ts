import {sdk} from '../src/index';

test('sdk out put is ok', () => {
  // Assert
  expect(sdk.hello(sdk.name)).toBe('sdk hello!');
});