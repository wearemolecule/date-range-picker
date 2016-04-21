import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    apply() {
      this.send('toggleIsExpanded');
      this.sendAction('apply');
    },

    cancel() {
      this.send('toggleIsExpanded');
      this.sendAction('cancel');
    },
  }
});
