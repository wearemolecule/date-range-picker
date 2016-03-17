import Ember from 'ember';
import layout from '../templates/components/calendar-display';
import _ from 'lodash/lodash';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  selectionStart: null,
  selectionEnd: null,
  month: moment(),
  monthPickerExpanded: false,
  yearPickerExpanded: false,
  allMonths: _.range(1, 13),
  allYearsOffset: 5,

  allYears: computed('month', function() {
    let year = this.get('month').year();
    let offset = this.get('allYearsOffset');

    return _.range(year - offset, year + offset + 1);
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

    setMonth(month) {
      let day = this.get('month').day();
      let year = this.get('month').year();
      this.set('month', moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'));
      this.send('toggleMonthPicker');
    },

    setYear(year) {
      let day = this.get('month').day();
      let month = this.get('month').month();
      this.set('month', moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'));
      this.send('toggleYearPicker');
    },

    toggleMonthPicker() {
      this.toggleProperty('monthPickerExpanded');
      this.set('yearPickerExpanded', false);
    },

    toggleYearPicker() {
      this.toggleProperty('yearPickerExpanded');
      this.set('monthPickerExpanded', false);
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
