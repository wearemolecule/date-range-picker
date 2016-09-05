import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  tabIndex: -1,
  layout,
  isSelected: false,

  actions: {
    applyPreset(preset) {
      this.sendAction('startSelected', preset.startDate);
      this.sendAction('endSelected', preset.endDate);
    },

    toggleIsSelected() {
      this.toggleProperty('isSelected');
    },
  }
});
