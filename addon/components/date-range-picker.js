import Ember from 'ember';
import layout from '../templates/components/date-range-picker';

export default Ember.Component.extend({
  layout,
  startDate: null,
  endDate: null,
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month').add(1, 'month'),

  actions: {
    startSelected(day) {
      this.set('startDate', day);
    },

    endSelected(day) {
      this.set('endDate', day);
    },

    prevStartMonth() {
      this.set('startMonth', this.get('startMonth').add(-1, 'month').clone());
    },
    prevEndMonth() {
      this.set('endMonth', this.get('endMonth').add(-1, 'month').clone());
    },
    nextStartMonth() {
      this.set('startMonth', this.get('startMonth').add(1, 'month').clone());
    },
    nextEndMonth() {
      this.set('endMonth', this.get('endMonth').add(1, 'month').clone());
    },
  }
});
