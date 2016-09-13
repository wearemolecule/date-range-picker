import Ember from 'ember';
import layout from './template';
import Picker from 'date-range-picker/mixins/picker';
import KeyboardHotkeys from 'date-range-picker/mixins/keyboard-hotkeys';

const {
  computed,
  Component,
} = Ember;

export default Component.extend(Picker, KeyboardHotkeys, {
  mask: "9[9]/9[9]/99[99]—9[9]/9[9]/99[99]",
  presets: Ember.A(),
  layout,
  cancelSelected: false,
  applySelected: false,

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

  rangeFormatted: computed('startDate', 'endDate', function() {
    let startDate = this.get('startDate').format('MM/DD/YYYY');
    let endDate = this.get('endDate').format('MM/DD/YYYY');

    return `${startDate}—${endDate}`;
  }),

  selectedIndexAndCurrentPreset() {
    let selectedIndex = this.selectedPresetIndex();
    let currentPreset = this.get('presets')[selectedIndex];
    if (currentPreset) {
      Ember.set(currentPreset, "isSelected", false);
    }
    return [selectedIndex, currentPreset];
  },

  incrementSelectionIndex(currentPreset, currentIndex) {
    if (currentIndex < 0 && !this.get('cancelSelected') && !this.get('applySelected')) { // just opened window
      this.set('cancelSelected', false);
      this.set('applySelected', false);
      return 0;
    } else if (currentPreset && currentIndex < this.get('presets').length - 1) { // currently in the middle of preset selection
      this.set('cancelSelected', false);
      this.set('applySelected', false);
      return currentIndex + 1;
    } else if (currentIndex >= this.get('presets').length - 1 && !this.get('cancelSelected') && !this.get('applySelected')) { // at end of presets
      this.set('cancelSelected', true);
      this.set('applySelected', false);
      return null;
    } else if (this.get('cancelSelected')) { // cancel is selected
      this.set('cancelSelected', false);
      this.set('applySelected', true);
      return null;
    } else { // default state
      this.set('cancelSelected', false);
      this.set('applySelected', false);
      return 0;
    }
  },

  onTriggerArrowDown() {
    let [selectedIndex, currentPreset] = this.selectedIndexAndCurrentPreset();
    let nextIndex = this.incrementSelectionIndex(currentPreset, selectedIndex);
    if (nextIndex !== null) {
      let nextPreset = this.get('presets')[nextIndex];
      Ember.set(nextPreset, "isSelected", true);
      this.send('applyPreset', nextPreset);
    }
  },

  decrementSelectionIndex(currentPreset, currentIndex) {
    if (currentIndex < 0 && !this.get('cancelSelected') && !this.get('applySelected')) { // just opened window
      this.set('cancelSelected', false);
      this.set('applySelected', true);
      return null;
    } else if (this.get('applySelected')) { // apply is selected
      this.set('cancelSelected', true);
      this.set('applySelected', false);
      return null;
    } else if (this.get('cancelSelected')) { // cancel is selected
      this.set('cancelSelected', false);
      this.set('applySelected', false);
      return this.get('presets').length - 1;
    } else if (currentPreset && currentIndex > 0) { // currently in the middle of preset selection
      this.set('cancelSelected', false);
      this.set('applySelected', false);
      return currentIndex - 1;
    } else { // default state
      this.set('cancelSelected', false);
      this.set('applySelected', true);
      return null;
    }
  },

  onTriggerArrowUp() {
    let [selectedIndex, currentPreset] = this.selectedIndexAndCurrentPreset();
    let nextIndex = this.decrementSelectionIndex(currentPreset, selectedIndex);
    if (nextIndex !== null) {
      let nextPreset = this.get('presets')[nextIndex];
      Ember.set(nextPreset, "isSelected", true);
      this.send('applyPreset', nextPreset);
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
