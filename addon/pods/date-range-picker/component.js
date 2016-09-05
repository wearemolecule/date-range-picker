import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import Clearable from 'date-range-picker/mixins/clearable';
import moment from 'moment';
import { EKMixin, keyUp } from 'ember-keyboard';

const {
  computed,
  on,
  observer,
  Component,
} = Ember;

export default Component.extend(Picker, Clearable, EKMixin, {
  mask: "9[9]/9[9]/99[99]—9[9]/9[9]/99[99]",
  layout,
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month'),
  selectedPresetIndex: computed('presets.@each.isSelected', function() {
    return this.get('presets').findIndex((preset) => {
      return preset.get('isSelected');
    })
  }),

  _leftArrowHandler: on(keyUp('ArrowLeft'), function() {
    this.onTriggerArrowUp();
  }),

  _rightArrowHandler: on(keyUp('ArrowRight'), function() {
    this.onTriggerArrowDown();
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
    let selectedIndex = this.get('selectedPresetIndex');
    if (selectedIndex) {
      let nextIndex = selectedIndex + 1;
      if (nextIndex < this.get('presets').length) {
        this.get('presets').setEach('isSelected', false);
        this.get('presets').objectsAt([nextIndex]).setEach('isSelected', true);
      } else {
        this.get('presets').setEach('isSelected', false);
        this.get('presets').objectsAt([0]).setEach('isSelected', true);
      }
    } else {
      this.get('presets').objectsAt([0]).setEach('isSelected', true);
    }
  },

  onTriggerArrowUp() {
    let selectedIndex = this.get('selectedPresetIndex');
    let lastIndex = this.get('presets').length - 1
    if (selectedIndex) {
      let nextIndex = selectedIndex - 1;
      if (nextIndex > 0) {
        this.get('presets').setEach('isSelected', false);
        this.get('presets').objectsAt([nextIndex]).set('isSelected', true);
      } else {
        this.get('presets').setEach('isSelected', false);
        this.get('presets').objectsAt([lastIndex]).set('isSelected', true);
      }
    } else {
      this.get('presets').objectsAt([lastIndex]).set('isSelected', true);
    }
  },

  onTriggerReturn() {
    this.sendAction('apply');
  },

  actions: {
    apply() {
      this.send('close');
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
