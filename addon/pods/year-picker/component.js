import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import KeyboardHotkeys from 'date-range-picker/mixins/keyboard-hotkeys';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(Picker, KeyboardHotkeys, {
  layout,
  dateFormat: "YYYY",

  didReceiveAttrs() {
    this._super();
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  rangeFormatted: computed('startDate', function() {
    return this.get('startDate').format('YYYY');
  }),
});
