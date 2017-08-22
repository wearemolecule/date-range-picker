import Ember from 'ember';
import layout from './template';
import { range } from 'date-range-picker/helpers/range';
import moment from 'moment';

const {
  computed,
  Component,
  run
} = Ember;

export default Component.extend({
  allYearsOffset: 10,
  isExpanded: false,
  layout,
  tagName: "span",
  month: moment(),
  energyYear: false,

  didRender() {
    if (this.get('isExpanded')) {
      run.next(this, () => {
        let year = this.get('insideYearPicker') ? this.get('startDate').year() : this.get('month').year();
        let $container = this.$('.dp-year-body');
        let $scrollTo = this.$(`button.dp-btn-year-option:contains(${year})`);
        $container.scrollTop(
          $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        );
        $container.animate({
          scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        }, 0);
      });
    }
  },

  allYears: computed('startDate', 'insideYearPicker', 'allYearsOffset', 'month', function() {
    let year = this.get('insideYearPicker') ? this.get('startDate').year() : this.get('month').year();
    let offset = this.get('allYearsOffset');

    return range(year - offset, year + offset + 1);
  }),

  setCalendarYear(year) {
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

  setEnergyYear(year) {
    this.set('startDate', moment(`${year - 1}-${6}-${1}`, 'YYYY-MM-DD'));
    this.set('endDate', moment(`${year}-${5}-${31}`, 'YYYY-MM-DD'));
  },

  actions: {
    setYear(year) {
      if (this.get('energyYear')) {
        this.setEnergyYear(year);
      } else {
        this.setCalendarYear(year);
      }
    },

    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
