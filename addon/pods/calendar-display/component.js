import Ember from 'ember';
import layout from './template';
import _ from 'lodash/lodash';

const { computed, observer } = Ember;

export default Ember.Component.extend({
  layout,
  selectionStart: null,
  selectionEnd: null,
  month: computed.alias('startDate'),
  monthIsExpanded: false,

  _monthIsExpandedValidator: observer('monthIsExpanded', function() {
    if (this.get('monthIsExpanded') === true) {
      this.set('yearIsExpanded', false);
    }
  }),

  yearIsExpanded: false,

  _yearIsExpandedValidator: observer('yearIsExpanded', function() {
    if (this.get('yearIsExpanded') === true) {
      this.set('monthIsExpanded', false);
    }
  }),

  calendarExpanded: computed('monthPickerExpanded', 'yearPickerExpanded', function() {
    return !this.get('monthPickerExpanded') && !this.get('yearPickerExpanded');
  }),

  weeks: computed('month', function() {
    var month = this.get('month');
    const weeksInMonth = month.endOf('month').week() - month.startOf('month').week();
    var weeks = [];
    for (var i = 0; i <= weeksInMonth; i++) {
      weeks[i] = buildWeek(month, i);
    }
    return weeks;
  }),

  actions: {
    daySelected(day) {
      this.sendAction('daySelected', day);
    },

    prevMonth() {
      this.sendAction('prevMonth', ...arguments);
    },

    nextMonth() {
      this.sendAction('nextMonth', ...arguments);
    },
  }
});

function buildWeek(month, week) {
  var firstDay = month.weekday();
  var daysInMonth = month.daysInMonth();
  var days = [];
  for (var i = 0; i < 7; i++) {
    var d = (i - firstDay + week * 7);
    days[i] = month.startOf('month').clone().add(d, 'day');
  }
  return days;
}
