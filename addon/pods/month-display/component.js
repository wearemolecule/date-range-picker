import Ember from 'ember';
import layout from './template';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  allMonths: _.range(1, 13),
  isExpanded: false,
  layout,
  tagName: "span",

  actions: {
    setMonth(month) {
      let newDate = this.get('month').clone().month(month);

      if (this.get('endOfMonth')) {
        this.set('month', newDate.endOf('month'));
      } else {
        this.set('month', newDate.startOf('month'));
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
