import Ember from 'ember';
import layout from './template';
import ClickOutside from 'date-range-picker/mixins/click-outside';
import Picker from 'date-range-picker/mixins/picker';
import moment from 'moment';

const {
  computed,
  Component,
} = Ember;

export default Component.extend(ClickOutside, Picker, {
  layout,
  startDate: moment().startOf('day'),
  endDate: moment().startOf('day'),
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month'),

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/DD/YYYY');
    let endDate = this.get('endDate').format('MM/DD/YYYY');

    return `${startDate} - ${endDate}`;
  }),

  actions: {
    apply() {
      this.send('toggleIsExpanded');
      this.sendAction('apply', this.get('startDate'), this.get('endDate'));
    },

    cancel() {
      this.send('toggleIsExpanded');
      this.sendAction('cancel');
    },

    startSelected(day) {
      let endDate = this.get('endDate');
      if (day.isAfter(endDate)) {
        this.set('endDate', day);
      }

      this.set('startDate', day);
    },

    endSelected(day) {
      let startDate = this.get('startDate');
      if (day.isBefore(startDate)) {
        this.set('startDate', day);
      }

      this.set('endDate', day);
    },

    parseInput() {
      let [ start, end ] = this.get('rangeFormatted').split(' - ');

      this.setProperties({
        startDate: moment(start, 'MM/DD/YYYY'),
        endDate: moment(end, 'MM/DD/YYYY'),
        startMonth: moment(start, 'MM/DD/YYYY'),
        endMonth: moment(end, 'MM/DD/YYYY'),
      });
    },

    prevStartMonth() {
      this.set('startMonth', this.get('startMonth').add(-1, 'month').clone());
    },

    prevEndMonth() {
      this.set('endMonth', this.get('endMonth').add(-1, 'month').clone());
    },

    nextStartMonth() {
      this.set('startMonth', this.get('startMonth').add(1, 'month').clone());
    },

    nextEndMonth() {
      this.set('endMonth', this.get('endMonth').add(1, 'month').clone());
    },
  }
});
