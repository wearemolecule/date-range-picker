import Ember from 'ember';
import layout from './template';
import SafeMoment from 'ember-date-range-picker/mixins/safe-moment';
import Picker from 'ember-date-range-picker/mixins/picker';
import KeyboardHotkeys from 'ember-date-range-picker/mixins/keyboard-hotkeys';
import moment from 'moment';

const {
  computed,
  run,
  Component,
} = Ember;

export default Component.extend(Picker, KeyboardHotkeys, SafeMoment, {
  layout,
  dateFormat: "YYYY",
  defaultStart: 'year',
  defaultEnd: 'year',
  classNameBindings: ['energyYear:dp-energy-year-picker:dp-year-picker'],

  energyYear: false,

  init() {
    this._super(...arguments);
    run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
    });
  },

  inputMask: computed('energyYear', function() {
    if (this.get('energyYear')) {
      return "EY 99[99]";
    } else {
      return "99[99]";
    }
  }),

  rangeFormatted: computed('startDate', 'endDate', 'dateFormat', 'energyYear', {
    get() {
      let dateFormat = this.get('dateFormat');
      let date = this.get('endDate') ? this.get('endDate').format(dateFormat) : '';
      if (this.get('energyYear')) {
        return "EY " + date;
      } else {
        return date;
      }
    },

    set() {
      this._super(...arguments);
    }
  }),

  hasDateParseOverride: computed('energyYear', function() {
    return this.get('energyYear');
  }),

  overrideStartDateParse(startDate) {
    if (this.get('energyYear') && startDate && startDate.isValid()) {
      return moment(`${startDate.year() - 1}-${6}-${1}`, "YYYY-MM-DD");
    } else {
      return null;
    }
  },

  overrideEndDateParse(endDate) {
    if (this.get('energyYear') && endDate && endDate.isValid()) {
      return moment(`${endDate.year()}-${5}-${31}`, "YYYY-MM-DD");
    } else {
      return null;
    }
  },
});
