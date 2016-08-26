import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import Clearable from 'date-range-picker/mixins/clearable';
import PickerActions from 'date-range-picker/mixins/picker-actions';
import moment from 'moment';
import ClickOutside from 'date-range-picker/mixins/click-outside';
import { EKMixin, keyUp } from 'ember-keyboard';

const {
  computed,
  on,
  observer,
  Component,
} = Ember;

export default Component.extend(Picker, Clearable, PickerActions, EKMixin, ClickOutside, {
  mask: "9[9]/9[9]/99[99]—9[9]/9[9]/99[99]",
  layout,
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month'),
  keyboardActivated: computed.alias('isExpanded'),
  keyboardFirstResponder: computed.alias('isExpanded'),
  focusedDay: 0,
  presetTabIndex: 1,

  _focusedDayHandler: observer('focusedDay', function() {
    let focusedDayIndex = this.get('focusedDay');
    let elementToFocus = this.$('.dp-day').get(focusedDayIndex);

    if (!!elementToFocus) {
      elementToFocus.focus();
    } else {
      this.set('focusedDay', 0);
    }
  }),

  _leftArrowHandler: on(keyUp('ArrowLeft'), function() {
    this.onTriggerArrowLeft();
  }),

  _rightArrowHandler: on(keyUp('ArrowRight'), function() {
    this.onTriggerArrowRight();
  }),

  _downArrowHandler: on(keyUp('ArrowDown'), function() {
    this.onTriggerArrowDown();
  }),

  _upArrowHandler: on(keyUp('ArrowUp'), function() {
    this.onTriggerArrowUp();
  }),

  _escapeHandler: on(keyUp('Escape'), function() {
    this.onTriggerEscape();
  }),

  _returnHandler: on(keyUp('Enter'), function() {
    this.onTriggerReturn();
  }),

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/DD/YYYY');
    let endDate = this.get('endDate').format('MM/DD/YYYY');

    return `${startDate}—${endDate}`;
  }),

  onTriggerArrowDown() {
    this.incrementProperty('focusedDay', 7);
  },

  onTriggerArrowUp() {
    this.decrementProperty('focusedDay', 7);
  },
 
  onTriggerArrowLeft() {
    this.decrementProperty('focusedDay');
  },

  onTriggerArrowRight() {
    this.incrementProperty('focusedDay');
  },

  onTriggerReturn() {
    this.$('.dp-day')[this.get('focusedDay')].click();
  },

  onTriggerEscape() {
    this.set('isExpanded', false);
  },

  actions: {
    apply() {
      this.send('toggleIsExpanded');
      this.sendAction('apply', this.get('startDate'), this.get('endDate'));
    },

    endSelected(day) {
      let startDate = this.get('startDate');

      if (day.isBefore(startDate)) {
        this.set('startDate', day);
      }

      this.set('endDate', day);
    },

    nextEndMonth() {
      this.set('endMonth', this.get('endMonth').clone().add(1, 'month').startOf('month'));
    },

    nextStartMonth() {
      this.set('startMonth', this.get('startMonth').clone().add(1, 'month').startOf('month'));
    },

    prevEndMonth() {
      this.set('endMonth', this.get('endMonth').clone().subtract(1, 'month').startOf('month'));
    },

    prevStartMonth() {
      this.set('startMonth', this.get('startMonth').clone().subtract(1, 'month').startOf('month'));
    },

    startSelected(day) {
      let endDate = this.get('endDate');

      if (day.isAfter(endDate)) {
        this.set('endDate', day);
      }

      this.set('startDate', day);
    },
  }
});
