import Ember from 'ember';
import layout from '../templates/components/presets-picker';

export default Ember.Component.extend({
  layout,
  classNames: ['presets-picker'],

  actions: {
    applyPreset(preset) {
      this.sendAction('startSelected', preset.startDate);
      this.sendAction('endSelected', preset.endDate);
    }
  }
});
