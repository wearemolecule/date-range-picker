import Ember from 'ember';
import layout from '../templates/components/date-range-picker';
import ClickOutside from 'date-range-picker/mixins/click-outside';

export default Ember.Component.extend(ClickOutside, {
  layout,
  startDate: moment().startOf('day'),
  endDate: moment().startOf('day').add(1, 'month'),
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month').add(1, 'month'),
  isExpandedStart: false,
  isExpandedEnd: false,
  isExpandedPreset: false,

  rangeStart: Ember.computed('startDate', function() {
    let startDate = this.get('startDate').format('MM/DD/YYYY');

    return `${startDate}`;
  }),

  rangeEnd: Ember.computed('endDate', function() {
    let endDate = this.get('endDate').format('MM/DD/YYYY');

    return `${endDate}`;
  }),

  actions: {
    applyStart() {
      this.send('toggleIsExpandedStart');
      this.sendAction('apply');
    },

    cancelStart() {
      this.send('toggleIsExpandedStart');
      this.sendAction('cancel');
    },

    applyEnd() {
      this.send('toggleIsExpandedEnd');
      this.sendAction('apply');
    },

    cancelEnd() {
      this.send('toggleIsExpandedEnd');
      this.sendAction('cancel');
    },

    applyPreset() {
      this.send('toggleIsExpandedPreset');
      this.sendAction('apply');
    },

    cancelPreset() {
      this.send('toggleIsExpandedPreset');
      this.sendAction('cancel');
    },

    startSelected(day) {
      let endDate = this.get('endDate');
      if (day.isAfter(endDate)) {
        this.set('endDate', day);
      }

      this.set('startDate', day);
    },

    endSelected(day) {
      let startDate = this.get('startDate');
      if (day.isBefore(startDate)) {
        this.set('startDate', day);
      }

      this.set('endDate', day);
    },

    parseInput() {
      let [ start, end ] = this.get('rangeFormatted').split(' - ');

      this.setProperties({
        startDate: moment(start, 'MM/DD/YYYY'),
        endDate: moment(end, 'MM/DD/YYYY'),
        startMonth: moment(start, 'MM/DD/YYYY'),
        endMonth: moment(end, 'MM/DD/YYYY'),
      });
    },

    prevStartMonth() {
      this.set('startMonth', this.get('startMonth').add(-1, 'month').clone());
    },

    prevEndMonth() {
      this.set('endMonth', this.get('endMonth').add(-1, 'month').clone());
    },

    nextStartMonth() {
      this.set('startMonth', this.get('startMonth').add(1, 'month').clone());
    },

    nextEndMonth() {
      this.set('endMonth', this.get('endMonth').add(1, 'month').clone());
    },

    toggleIsExpandedStart() {
      this.toggleProperty('isExpandedStart');
      this.set('isExpandedEnd', false);
      this.set('isExpandedPreset', false);
    },

    toggleIsExpandedEnd() {
      this.toggleProperty('isExpandedEnd');
      this.set('isExpandedStart', false);
      this.set('isExpandedPreset', false);
    },

    toggleIsExpandedPreset() {
      this.toggleProperty('isExpandedPreset');
      this.set('isExpandedStart', false);
      this.set('isExpandedEnd', false);
    }
  }
});
