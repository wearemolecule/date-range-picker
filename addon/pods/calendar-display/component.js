import Ember from 'ember';
import layout from './template';
import ExpandedValidators from 'date-range-picker/mixins/expanded-validators';
import { buildWeek } from 'date-range-picker/helpers/build-week';

const { computed } = Ember;

export default Ember.Component.extend(ExpandedValidators, {
  layout,
  month: computed.alias('startMonth'),
  selectionEnd: null,
  selectionStart: null,

  calendarExpanded: computed('monthPickerExpanded', 'yearPickerExpanded', function() {
    return !this.get('monthPickerExpanded') && !this.get('yearPickerExpanded');
  }),

  weeks: computed('month', function() {
    var weekNumber = this.get('month').startOf('month').week();
    var weeks = [];
    for (var i = 0; i <= 4; i++) {
      weeks[i] = buildWeek(this.get('month').clone().week(weekNumber + i));
    }
    return weeks;
  }),

  actions: {
    daySelected(day) {
      this.sendAction('daySelected', day);
    },

    nextMonth() {
      this.sendAction('nextMonth', ...arguments);
    },

    prevMonth() {
      this.sendAction('prevMonth', ...arguments);
    },
  }
});
