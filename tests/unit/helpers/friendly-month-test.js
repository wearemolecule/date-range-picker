import { friendlyMonth } from 'dummy/helpers/friendly-month';
import { module, test } from 'qunit';
import { range } from 'ember-date-range-picker/helpers/range';

module('Unit | Helper | friendly month');

test('it works', function(assert) {
  let actualMonths = range(1, 13).map(monthIndex => friendlyMonth(monthIndex));

  let expectedMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  assert.deepEqual(actualMonths, expectedMonths, '1 through 12 return MMM formatted month');
});
