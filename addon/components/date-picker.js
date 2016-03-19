import Ember from 'ember';
import layout from '../templates/components/date-picker';

export default Ember.Component.extend({
  layout,
  month: moment(),
  date: moment(),
  isExpanded: false,
  showInput: true,

  init() {
    let curMonth = this.get('date').startOf('month');
    this.set('month', curMonth);

    this._super(...arguments);
  },

  dateFormatted: Ember.computed('date', function() {
    return this.get('date').format('MM/DD/YYYY');
  }),

  setDateAndMonth(date) {
    this.set('date', date);
    this.set('month', date.clone().startOf('month'));
    this.set('isExpanded', false);
    this.sendAction('selected', date);
  },

  actions: {
    daySelected(date) {
      this.setDateAndMonth(date);
    },

    today() {
      let date = moment().startOf('day');
      this.setDateAndMonth(date);
    },

    parseInput() {
      let dateFormatted = this.get('dateFormatted');

      this.setProperties({
        date: moment(dateFormatted, 'MM/DD/YYYY'),
        month: moment(dateFormatted, 'MM/DD/YYYY'),
      });
    },

    prevMonth() {
      this.set('month', this.get('month').add(-1, 'month').clone());
    },

    nextMonth() {
      this.set('month', this.get('month').add(1, 'month').clone());
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },

    setIsExpanded() {
      this.set('isExpanded', true);
    },

    setNotExpanded() {
      this.set('isExpanded', false);
    },
  }
});
