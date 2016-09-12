import Ember from 'ember';
import YearPicker from '../year-picker/component';
import moment from 'moment';

const {
  computed,
} = Ember;

export default YearPicker.extend({
  startOfYearMonth: "06",
  startOfYearDay: "01",
  endOfYearMonth: "05",
  endOfYearDay: "31",

  rangeFormatted: computed('startDate', function() {
    return "EY " + this.get('startDate').format('YYYY');
  }),

  actions: {
    parseInput() {
      let yearInt = parseInt(this.get('rangeFormatted').replace("EY", ""));

      let startOfYearMonth = this.get('startOfYearMonth');
      let startOfYearDay = this.get('startOfYearDay');
      let startMoment = moment(`${yearInt}-${startOfYearMonth}-${startOfYearDay}`, 'YYYY-MM-DD');

      let endOfYearMonth = this.get('endOfYearMonth');
      let endOfYearDay = this.get('endOfYearDay');
      let endMoment = moment(`${(yearInt + 1)}-${endOfYearMonth}-${endOfYearDay}`, 'YYYY-MM-DD');

      if(startMoment.isValid() && endMoment.isValid()) {
        this.setProperties({
          startDate: startMoment,
          endDate: endMoment
        });
      }
    }
  }
});
