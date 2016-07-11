import Ember from 'ember';
import layout from './template';
import { range } from 'date-range-picker/helpers/range';
import moment from 'moment';
import Picker from 'date-range-picker/mixins/picker';

const {
  computed,
  Component,
} = Ember;

export default Component.extend(Picker, {
  allYearsOffset: 10,
  isExpanded: false,
  layout,
  tagName: "span",

  allYears: computed('startDate', function() {
    let year = moment().year();
    let offset = this.get('allYearsOffset');

    return range(year - offset, year + offset + 1);
  }),

  actions: {
    setYear(year) {
      let day = this.get('startDate').date();
      let month = this.get('startDate').format("MM");
      let startDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      let endDate = moment(year, "YYYY").endOf('year');

      if (this.get('ignoreMonthAndDay')) {
        startDate = moment(year, "YYYY").startOf('year');
      }

      if (!this.get('onlyUpdateMonth')) {
        this.set('endDate', endDate);
        this.set('startDate', startDate);
      } else {
        let monthDay = this.get('month').date();
        let monthMonth = this.get('month').format("MM");
        let newMonth = moment(`${year}-${monthMonth}-${monthDay}`, 'YYYY-MM-DD');

        this.set('month', newMonth);
      }

      if(this.get('yearWasSelected')) {
        this.sendAction('yearWasSelected');
      }
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
