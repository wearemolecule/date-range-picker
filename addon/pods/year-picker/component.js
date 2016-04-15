import Ember from 'ember';
import layout from './template';
import ClickOutside from 'date-range-picker/mixins/click-outside';
import Picker from 'date-range-picker/mixins/picker';
import moment from 'moment';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(ClickOutside, Picker, {
  layout,

  didInsertElement() {
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  rangeFormatted: computed('startDate', function() {
    let year = this.get('startDate').format('YYYY');

    return `${year}`;
  }),

  actions: {
    parseInput() {
      let year = moment(this.get('rangeFormatted'), 'YYYY');
      let start = year.startOf('year');
      let end = year.endOf('year');

      this.setProperties({
        startDate: start,
        endDate: end,
        startMonth: start,
        endMonth: end,
      });
    },

    cancel() {
      this.send('toggleIsExpanded');
      this.sendAction('cancel');
    },

    yearWasSelected() {
      this.send('toggleIsExpanded');
    },
  },
});
