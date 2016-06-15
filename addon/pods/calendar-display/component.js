import Ember from 'ember';
import layout from './template';
import ExpandedValidators from 'date-range-picker/mixins/expanded-validators';
import { buildWeek } from 'date-range-picker/helpers/build-week';

const { computed } = Ember;

export default Ember.Component.extend(ExpandedValidators, {
  layout,
  month: computed.alias('startDate'),
  selectionEnd: null,
  selectionStart: null,

  calendarExpanded: computed('monthPickerExpanded', 'yearPickerExpanded', function() {
    return !this.get('monthPickerExpanded') && !this.get('yearPickerExpanded');
  }),

  weeks: computed('month', function() {
    var month = this.get('month');
    const weeksInMonth = Math.floor(month.daysInMonth() / 7);
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

    nextMonth() {
      this.sendAction('nextMonth', ...arguments);
    },

    prevMonth() {
      this.sendAction('prevMonth', ...arguments);
    },
  }
});
