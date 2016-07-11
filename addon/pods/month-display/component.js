import Ember from 'ember';
import layout from './template';
import { range } from 'date-range-picker/helpers/range';

export default Ember.Component.extend({
  allMonths: range(1, 13),
  isExpanded: false,
  layout,
  tagName: "span",

  actions: {
    setMonth(month) {
      if (this.get('endOfMonth')) {
        this.set('month', this.get('month').clone().month(month).endOf('month'));
      } else {
        this.set('month', this.get('month').clone().month(month).startOf('month'));
      }

      if(this.get('monthWasSelected')) {
        this.sendAction('monthWasSelected');
      }
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
