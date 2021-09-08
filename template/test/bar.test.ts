import { bar } from '../src/bar'

test('bar out put is ok', () => {
  // Assert
  expect(bar()).toBe('I am bar!')
})
