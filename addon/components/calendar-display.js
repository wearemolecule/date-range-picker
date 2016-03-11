import Ember from 'ember';
import layout from '../templates/components/calendar-display';

export default Ember.Component.extend({
  layout,
  selectionStart: null,
  selectionEnd: null,
  month: moment(),

  weeks: Ember.computed('month', function() {
    var month = this.get('month')
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
    }
  }
});

function buildWeek(month, week) {
  var firstDay = month.weekday();
  var daysInMonth = month.daysInMonth();
  var days = [];
  for (var i = 0; i < 7; i++) {
    var d = (i - firstDay + week * 7)
    days[i] = month.startOf('month').clone().add(d, 'day')
  }
  return days;
}
