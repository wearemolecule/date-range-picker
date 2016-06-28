import Ember from 'ember';

const { observer } = Ember;

export default Ember.Mixin.create({
  monthIsExpanded: false,
  yearIsExpanded: false,

  _monthIsExpandedValidator: observer('monthIsExpanded', function() {
    if (this.get('monthIsExpanded') === true) {
      this.set('yearIsExpanded', false);
    }
  }),

  _yearIsExpandedValidator: observer('yearIsExpanded', function() {
    if (this.get('yearIsExpanded') === true) {
      this.set('monthIsExpanded', false);
    }
  }),

  actions: {
    toggleMonthExpanded() {
      this.toggleProperty('monthIsExpanded');
    },

    toggleYearExpanded() {
      this.toggleProperty('yearIsExpanded');
    },
  }
});
