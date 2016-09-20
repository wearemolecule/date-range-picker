import Ember from 'ember';
import PickerMixin from 'date-range-picker/mixins/picker';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Mixin | picker'); 
const PickerObject = Ember.Object.extend(PickerMixin);

test('it works', function(assert) {
  let subject = PickerObject.create();
  assert.ok(subject);
});

test('#parseInput handles different range inputs', function(assert) {
  let PickerActionsObject = Ember.Component.extend(PickerMixin);
  let format = "MM/DD/YYYY";
  let currentYear = moment().year();

  let testCases = [
    // Valid Start Date Supplied but no End Date
    { rangeFormatted: "6/16/16—_/_/__", startDate: moment("6/16/16", format), endDate: moment("6/16/16", format) },
    { rangeFormatted: "06/6/16—_/_/__", startDate: moment("06/6/16", format), endDate: moment("06/6/16", format) },
    { rangeFormatted: "06/16/2016—_/_/__", startDate: moment("06/16/2016", format), endDate: moment("06/16/2016", format) },

    // Valid End Date Supplied but no Start Date
    { rangeFormatted: "_/__/__—6/16/16", startDate: moment("6/16/16", format), endDate: moment("6/16/16", format) },
    { rangeFormatted: "_/_/__—06/6/16", startDate: moment("06/6/16", format), endDate: moment("06/6/16", format) },
    { rangeFormatted: "_/_/__—06/16/2016", startDate: moment("06/16/2016", format), endDate: moment("06/16/2016", format) },

    // Valid Start and End Date supplied
    { rangeFormatted: "5/15/15—6/16/16", startDate: moment("5/15/15", format), endDate: moment("6/16/16", format) },
    { rangeFormatted: "05/5/15—06/6/16", startDate: moment("05/5/15", format), endDate: moment("06/6/16", format) },
    { rangeFormatted: "05/15/2015—06/16/2016", startDate: moment("05/15/2015", format), endDate: moment("06/16/2016", format) },

    // Invalid Start and End Date supplied
    { rangeFormatted: "_/_/__—_/_/__", startDate: moment().startOf('year'), endDate: moment().endOf('year') },
    { rangeFormatted: "0/0/00—0/0/00", startDate: moment().startOf('year'), endDate: moment().endOf('year') },
    { rangeFormatted: "99/99/9999—99/99/9999", startDate: moment().startOf('year'), endDate: moment().endOf('year') },
    { rangeFormatted: "5/_/__—_/_/__", startDate: moment(`05/01/${currentYear}`, format), endDate: moment(`05/01/${currentYear}`, format) },
    { rangeFormatted: "5/15/__—_/_/__", startDate: moment(`05/15/${currentYear}`, format), endDate: moment(`05/15/${currentYear}`, format) },
  ];

  testCases.forEach(function(criteria) {
    let subject = PickerActionsObject.create({
      startDate: moment().startOf('year'),
      endDate: moment().endOf('year'),
      rangeFormatted: criteria.rangeFormatted,
    });
    
    assert.equal(subject.get('rangeFormatted'), criteria.rangeFormatted);
    subject.send('parseInput');
    assert.ok(subject.get('startDate').isSame(criteria.startDate, 'day'),
              "Start Date for " + criteria.rangeFormatted +
                " should be " + criteria.startDate.format(format) +
                " received " + subject.get('startDate').format(format));
    assert.ok(subject.get('endDate').isSame(criteria.endDate, 'day'),
              "End Date for " + criteria.rangeFormatted +
                " should be " + criteria.endDate.format(format) +
                " received " + subject.get('endDate').format(format));
  });
});
