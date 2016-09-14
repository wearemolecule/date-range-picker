import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import KeyboardHotkeys from 'date-range-picker/mixins/keyboard-hotkeys';
import MultipleExpandedValidators from 'date-range-picker/mixins/multiple-expanded-validators';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(Picker, MultipleExpandedValidators, KeyboardHotkeys, {
  dateFormat: "MM/YYYY",
  layout,
  defaultStart: 'month',
  defaultEnd: 'month',

  init() {
    this._super(...arguments);
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
