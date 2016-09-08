import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import KeyboardHotkeys from 'date-range-picker/mixins/keyboard-hotkeys';
import moment from 'moment';
import { keyDown } from 'ember-keyboard';

const {
  computed,
  on,
  Component,
} = Ember;

export default Component.extend(Picker, KeyboardHotkeys, {
  mask: "9[9]/9[9]/99[99]—9[9]/9[9]/99[99]",
  presets: Ember.A(),
  layout,

  selectedPresetIndex() {
    let sets = this.get('presets');
    let index = sets.findIndex((preset) => {
      return preset.isSelected;
    });
    if (!index || index < 0) {
      sets.forEach((preset) => {
        Ember.set(preset, 'isSelected', false);
      });
    }
    return index;
  },

  _leftArrowHandler: on(keyDown('ArrowLeft'), function() {
    this.onTriggerArrowUp();
  }),

  _rightArrowHandler: on(keyDown('ArrowRight'), function() {
    this.onTriggerArrowDown();
  }),

  _downArrowHandler: on(keyDown('ArrowDown'), function() {
    this.onTriggerArrowDown();
  }),

  _upArrowHandler: on(keyDown('ArrowUp'), function() {
    this.onTriggerArrowUp();
  }),

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/DD/YYYY');
    let endDate = this.get('endDate').format('MM/DD/YYYY');

    return `${startDate}—${endDate}`;
  }),

  onTriggerArrowDown() {
    console.log("Triggered Down Arrow");
    let selectedIndex = this.selectedPresetIndex();
    let currentPreset = this.get('presets')[selectedIndex];
    if (currentPreset) {
      Ember.set(currentPreset, "isSelected", false);
    }
    let nextIndex = 0;
    if (currentPreset && selectedIndex < this.get('presets').length - 1) {
      nextIndex = selectedIndex + 1;
    }   
    let nextPreset = this.get('presets')[nextIndex];
    Ember.set(nextPreset, "isSelected", true);
    this.send('applyPreset', nextPreset);
  },

  onTriggerArrowUp() {
    console.log("Triggered Down Arrow");
    let selectedIndex = this.selectedPresetIndex();
    let currentPreset = this.get('presets')[selectedIndex];
    if (currentPreset) {
      Ember.set(currentPreset, "isSelected", false);
    }
    let nextIndex = this.get('presets').length - 1;
    if (currentPreset && selectedIndex > 0) {
      nextIndex = selectedIndex - 1;
    }   
    let nextPreset = this.get('presets')[nextIndex];
    Ember.set(nextPreset, "isSelected", true);
    this.send('applyPreset', nextPreset);
  },

  onTriggerReturn() {
    if (this.get('dropdownOpen') && !this.get('datesSame')) {
      this.send('apply');
    }
  },

  actions: {
    clearSelection() {
      this.get('presets').forEach((preset) => {
        Ember.set(preset, "isSelected", false);
      });
    },

    applyPreset(preset) {
      this.send('startSelected', preset.startDate);
      this.send('endSelected', preset.endDate);
    },

    cancel() {
      this.send('clearSelection');
      this._super();
    },

    apply() {
      this.send('clearSelection');
      this._super();
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
