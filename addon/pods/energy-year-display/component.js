import moment from 'moment';
import YearDisplay from '../year-display/component';

export default YearDisplay.extend({
  actions: {
    setYear(year) {
      this.set('startDate', moment(`${year}-${this.get('startOfYearMonth')}-${this.get('startOfYearDay')}`, 'YYYY-MM-DD'));
      this.set('endDate', moment(`${year + 1}-${this.get('endOfYearMonth')}-${this.get('endOfYearDay')}`, 'YYYY-MM-DD'));

      if(this.get('yearWasSelected')) {
        this.sendAction('yearWasSelected');
      }
    },
  },
});
