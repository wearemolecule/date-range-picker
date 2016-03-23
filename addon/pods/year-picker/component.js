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

  rangeFormatted: computed('startDate', function() {
    let year = this.get('startDate').format('YYYY');

    return `${year}`;
  }),

  actions: {
    parseInput() {
      let year = this.get('rangeFormatted');
      let start = year.startOf('year');
      let end = year.endOf('year');

      this.setProperties({
        startDate: start,
        endDate: end,
        startMonth: start,
        endMonth: end,
      });
    },
  },
});
