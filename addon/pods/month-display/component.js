import Ember from 'ember';
import layout from './template';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  layout,
  isExpanded: false,
  allMonths: _.range(1, 13),

  actions: {
    setMonth(month) {
      let day = this.get('month').date();
      let year = this.get('month').year();
      this.set('month', moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day'));
      this.send('toggleIsExpanded');
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
