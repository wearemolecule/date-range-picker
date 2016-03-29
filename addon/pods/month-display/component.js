import Ember from 'ember';
import layout from './template';
import _ from 'lodash/lodash';

const {
  computed,
} = Ember;

export default Ember.Component.extend({
  layout,
  isExpanded: false,
  allMonths: _.range(1, 13),
  tagName: "span",

  actions: {
    setMonth(month) {
      let day = this.get('month').date();
      let year = this.get('month').year();
      this.set('month', moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day'));
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
