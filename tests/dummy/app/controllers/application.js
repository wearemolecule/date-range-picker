import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  month: moment().startOf('month'),

  nextMonth: Ember.computed('month', function() {
    return this.get('month').clone().add(1, 'month');
  }),

  presets: [
    {
      name: 'Tomorrow',
      startDate: moment().add(1, 'day').startOf('day'),
      endDate: moment().add(1, 'day').startOf('day'),
    },
    {
      name: 'This Month',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month').startOf('day'),
    },
    {
      name: 'This Year',
      startDate: moment().startOf('year'),
      endDate: moment().endOf('year').startOf('day'),
    },
    {
      name: 'Next Year',
      startDate: moment().add(1, 'year').startOf('year'),
      endDate: moment().add(1, 'year').endOf('year').startOf('day'),
    }
  ],

  actions: {
    apply() {
      console.log('ApplicationController#cancel');
    },

    cancel() {
      console.log('ApplicationController#cancel');
    },

    nextMonth() {
      this.set('month', this.get('month').add(1, 'month').clone());
    },

    prevMonth() {
      this.set('month', this.get('month').add(-1, 'month').clone());
    }
  }
});
