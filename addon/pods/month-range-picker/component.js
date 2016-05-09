import Ember from 'ember';
import layout from './template';
import ClickOutside from 'date-range-picker/mixins/click-outside';
import Picker from 'date-range-picker/mixins/picker';
import Clearable from 'date-range-picker/mixins/clearable';
import ExpandedValidators from 'date-range-picker/mixins/multiple-expanded-validators';
import PickerActions from 'date-range-picker/mixins/picker-actions';
import moment from 'moment';

const {
  computed,
  observer,
  run,
  Component,
} = Ember;

export default Component.extend(ClickOutside, Picker, Clearable, ExpandedValidators, PickerActions, {
  endMonth: moment().startOf('day'),
  layout,
  startMonth: moment().startOf('day'),

  didInsertElement() {
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/YYYY');
    let endDate = this.get('endDate').format('MM/YYYY');

    return `${startDate} - ${endDate}`;
  }),

  actions: {
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
