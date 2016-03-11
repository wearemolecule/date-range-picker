import Ember from 'ember';

export default Ember.Controller.extend({
  month: moment().startOf('month'),
  nextMonth: Ember.computed('month', function() {
    return this.get('month').clone().add(1, 'month');
  }),

  actions: {
    nextMonth() {
      this.set('month', this.get('month').add(1, 'month').clone());
    },

    prevMonth() {
      this.set('month', this.get('month').add(-1, 'month').clone());
    }
  }
});
