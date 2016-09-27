import Ember from 'ember';
import layout from './template';
import moment from 'moment';
import ExpandedValidators from 'ember-date-range-picker/mixins/expanded-validators';
import { buildWeek } from 'ember-date-range-picker/helpers/build-week';

const { computed } = Ember;

export default Ember.Component.extend(ExpandedValidators, {
  layout,
  month: moment().startOf('month'),
  selectionEnd: null,
  selectionStart: null,

  calendarExpanded: computed('monthPickerExpanded', 'yearPickerExpanded', function() {
    return !this.get('monthPickerExpanded') && !this.get('yearPickerExpanded');
  }),

  weeks: computed('month', function() {
    var weekNumber = this.get('month').clone().startOf('month').week();
    var weeks = [];
    for (var i = 0; i <= 5; i++) {
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
