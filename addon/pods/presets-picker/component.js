import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  tabIndex: -1,
  layout,

  actions: {
    applyPreset(preset) {
      this.sendAction('startSelected', preset.startDate);
      this.sendAction('endSelected', preset.endDate);
    },
  }
});
