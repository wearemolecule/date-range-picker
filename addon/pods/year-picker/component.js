import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(Picker, {
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
});
