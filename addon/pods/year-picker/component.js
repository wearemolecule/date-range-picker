import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import PickerActions from 'date-range-picker/mixins/picker-actions';
import ClickOutside from 'date-range-picker/mixins/click-outside';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(Picker, PickerActions, ClickOutside, {
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
