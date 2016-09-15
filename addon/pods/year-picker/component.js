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
  defaultStart: 'year',
  defaultEnd: 'year',

  init() {
    this._super(...arguments);
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  rangeFormatted: Ember.computed('startDate', 'endDate', 'dateFormat', function() {
    let dateFormat = this.get('dateFormat');
    return this.get('startDate').format(dateFormat);
  })
});
