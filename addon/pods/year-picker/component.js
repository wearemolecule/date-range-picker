import Ember from 'ember';
import layout from './template';
import ClickOutside from 'date-range-picker/mixins/click-outside';
import Picker from 'date-range-picker/mixins/picker';
import PickerActions from 'date-range-picker/mixins/picker-actions';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(ClickOutside, Picker, PickerActions, {
  layout,
  dateFormat: "YYYY",

  didInsertElement() {
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  rangeFormatted: computed('startDate', function() {
    return this.get('startDate').format('YYYY');
  }),

  actions: {
    yearWasSelected() {
      this.send('toggleIsExpanded');
    },
  },
});
