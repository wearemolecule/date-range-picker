import Ember from 'ember';
import PickerMixin from 'date-range-picker/mixins/picker';
import { module, test } from 'qunit';
import moment from 'moment';

function safeIsSame(first, second) {
  if (!first || !second) {
    return first === second;
  }

  return first.isSame(second, 'day');
}

function safeFormat(day, format) {
  if (day && day.isValid()) {
    return day.format(format);
  } else {
    return day;
  }
}

module('Unit | Mixin | picker');
const PickerObject = Ember.Object.extend(PickerMixin);

test('it can be mixed into an Ember.Object', function(assert) {
  let subject = PickerObject.create();
  assert.ok(subject);
});

test('#rangeFormatted - set', function(assert) {
  let PickerActionsObject = Ember.Component.extend(PickerMixin);
  let format = "MM/DD/YYYY";
  let currentYear = moment().format("YYYY");

  let testCases = [
    // Valid Start Date Supplied but no End Date
    { rangeFormatted: "6/16/16—_/_/__", startDate: moment("6/16/16", format), endDate: null },
    { rangeFormatted: "06/6/16—_/_/__", startDate: moment("06/6/16", format), endDate: null },
    { rangeFormatted: "06/16/2016—_/_/__", startDate: moment("06/16/2016", format), endDate: null },

    // Valid End Date Supplied but no Start Date
    { rangeFormatted: "_/__/__—6/16/16", startDate: null, endDate: moment("6/16/16", format) },
    { rangeFormatted: "_/_/__—06/6/16", startDate: null, endDate: moment("06/6/16", format) },
    { rangeFormatted: "_/_/__—06/16/2016", startDate: null, endDate: moment("06/16/2016", format) },

    // Valid Start and End Date supplied
    { rangeFormatted: "5/15/15—6/16/16", startDate: moment("5/15/15", format), endDate: moment("6/16/16", format) },
    { rangeFormatted: "05/5/15—06/6/16", startDate: moment("05/5/15", format), endDate: moment("06/6/16", format) },
    { rangeFormatted: "05/15/2015—06/16/2016", startDate: moment("05/15/2015", format), endDate: moment("06/16/2016", format) },

    // TODO
    // Invalid Start and End Date supplied
    { rangeFormatted: "_/_/__—_/_/__", startDate: null, endDate: null },
    { rangeFormatted: "0/0/00—0/0/00", startDate: null, endDate: null },
    { rangeFormatted: "99/99/9999—99/99/9999", startDate: null, endDate: null },
    { rangeFormatted: "5/_/__—_/_/__", startDate: moment(`05/01/${currentYear}`, format), endDate: null },
    { rangeFormatted: "5/15/__—_/_/__", startDate: moment(`05/15/${currentYear}`, format), endDate: null },

    // End Date Occurs Before Start Date
    { rangeFormatted: "5/15/16—4/1/15", startDate: moment(`04/1/2015`, format), endDate: moment(`05/15/2016`, format) },
  ];

  testCases.forEach(criteria => {
    let subject = PickerActionsObject.create({
      rangeFormatted: criteria.rangeFormatted,
    });

    assert.equal(subject.get('rangeFormatted'), criteria.rangeFormatted);
    assert.ok(safeIsSame(subject.get('startDate'), criteria.startDate),
              "Start Date for " + criteria.rangeFormatted +
              " should be " + safeFormat(criteria.startDate, format) +
              " but received " + safeFormat(subject.get('startDate'), format));
    assert.ok(safeIsSame(subject.get('endDate'), criteria.endDate),
              "End Date for " + criteria.rangeFormatted +
              " should be " + safeFormat(criteria.endDate, format) +
              " but received " + safeFormat(subject.get('endDate'), format));
  });
});
