import { buildWeek } from 'date-range-picker/helpers/build-week';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Helper | build week');

test('it works', function(assert) {
  let result = buildWeek(moment(), 0);
  assert.ok(result);
});
