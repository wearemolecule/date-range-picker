import Ember from 'ember';
import layout from './template';
import ClickOutside from 'date-range-picker/mixins/click-outside';
import Picker from 'date-range-picker/mixins/picker';
import Clearable from 'date-range-picker/mixins/clearable';
import moment from 'moment';

const {
  computed,
  observer,
  run,
  Component,
} = Ember;

export default Component.extend(ClickOutside, Picker, Clearable, {
  layout,
  startMonth: moment().startOf('day'),
  endMonth: moment().startOf('day'),
  leftMonthIsExpanded: true,

  didInsertElement() {
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  _leftMonthIsExpandedValidator: observer('leftMonthIsExpanded', function() {
    if (this.get('leftMonthIsExpanded') === true) {
      this.set('leftYearIsExpanded', false);
    }
  }),

  leftYearIsExpanded: false,

  _leftYearIsExpandedValidator: observer('leftYearIsExpanded', function() {
    if (this.get('leftYearIsExpanded') === true) {
      this.set('leftMonthIsExpanded', false);
    }
  }),

  rightMonthIsExpanded: true,

  _rightMonthIsExpandedValidator: observer('rightMonthIsExpanded', function() {
    if (this.get('rightMonthIsExpanded') === true) {
      this.set('rightYearIsExpanded', false);
    }
  }),

  rightYearIsExpanded: false,

  _rightYearIsExpandedValidator: observer('rightYearIsExpanded', function() {
    if (this.get('rightYearIsExpanded') === true) {
      this.set('rightMonthIsExpanded', false);
    }
  }),

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/YYYY');
    let endDate = this.get('endDate').format('MM/YYYY');

    return `${startDate} - ${endDate}`;
  }),

  actions: {
    apply() {
      this.send('toggleIsExpanded');
      this.sendAction('apply');
    },

    cancel() {
      this.send('toggleIsExpanded');
      this.sendAction('cancel');
    },

    parseInput() {
      let [ start, end ] = this.get('rangeFormatted').split(' - ');

      this.setProperties({
        startDate: moment(start, 'MM/YYYY'),
        endDate: moment(end, 'MM/YYYY'),
        startMonth: moment(start, 'MM/YYYY'),
        endMonth: moment(end, 'MM/YYYY'),
      });
    },
  },
});
