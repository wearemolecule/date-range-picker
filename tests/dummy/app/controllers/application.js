import EmberController from '@ember/controller';
import moment from 'moment';

export default EmberController.extend({
  month: moment().startOf('month'),
  start: moment().startOf('day'),
  end: moment().startOf('day').add(2, 'days'),

  init() {
    this._super(...arguments);
    this.presets = [
      {
        name: 'Today',
        startDate: moment().startOf('day'),
        endDate: moment().startOf('day'),
      },
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
    ];
  },

  actions: {
    apply() {},

    cancel() {},
  }
});
