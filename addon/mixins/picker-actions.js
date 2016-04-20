import Ember from 'ember';

export default Ember.Mixin.create({
  apply() {
    this.send('toggleIsExpanded');
    this.sendAction('apply');
  },

  cancel() {
    this.send('toggleIsExpanded');
    this.sendAction('cancel');
  },
});
