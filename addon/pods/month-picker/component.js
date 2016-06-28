import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import Clearable from 'date-range-picker/mixins/clearable';
import MultipleExpandedValidators from 'date-range-picker/mixins/multiple-expanded-validators';
import PickerActions from 'date-range-picker/mixins/picker-actions';
import moment from 'moment';
import ClickOutside from 'date-range-picker/mixins/click-outside';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(Picker, Clearable, MultipleExpandedValidators, PickerActions, ClickOutside, {
  dateFormat: "MM/YYYY",
  endMonth: moment().startOf('month'),
  layout,
  startMonth: moment().startOf('month'),

  didInsertElement() {
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/YYYY');
    let endDate = this.get('endDate').format('MM/YYYY');

    return `${startDate}—${endDate}`;
  }),
});
