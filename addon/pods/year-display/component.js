import Ember from 'ember';
import layout from './template';
import _ from 'lodash/lodash';
import ClickOutside from 'date-range-picker/mixins/click-outside';
import moment from 'moment';

const {
  computed,
  Component,
} = Ember;

export default Component.extend(ClickOutside, {
  layout,
  isExpanded: false,
  allYearsOffset: 5,

  allYears: computed('startDate', function() {
    let year = this.get('startDate').year();
    let offset = this.get('allYearsOffset');

    return _.range(year - offset, year + offset + 1);
  }),

  actions: {
    setYear(year) {
      let startDate = moment(year, "YYYY").startOf('year');
      let endDate = moment(year, "YYYY").endOf('year');
      this.set('startDate', startDate);
      this.set('endDate', endDate);
      this.send('toggleIsExpanded');
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
