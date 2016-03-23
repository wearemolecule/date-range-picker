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
  startMonth: moment().startOf('day'),
  endMonth: moment().startOf('day'),

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/YYYY');
    let endDate = this.get('endDate').format('MM/YYYY');

    return `${startDate} - ${endDate}`;
  }),

  actions: {
    cancel() {
      this.send('toggleIsExpanded');
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
  },
});
