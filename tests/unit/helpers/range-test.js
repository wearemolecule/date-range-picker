import { range } from 'ember-date-range-picker/helpers/range';
import { module, test } from 'qunit';

module('Unit | Helper | range');

test('it works', function(assert) {
  // Derived from https://lodash.com/docs#range

  assert.deepEqual(range(4), [0, 1, 2, 3]);
  assert.deepEqual(range(-4), [0, -1, -2, -3]);
  assert.deepEqual(range(1, 5), [1, 2, 3, 4]);
  assert.deepEqual(range(0), []);
});
