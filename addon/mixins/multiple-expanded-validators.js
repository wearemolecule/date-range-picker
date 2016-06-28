import Ember from 'ember';

const { observer } = Ember;

export default Ember.Mixin.create({
  leftMonthIsExpanded: true,
  leftYearIsExpanded: false,
  rightMonthIsExpanded: true,
  rightYearIsExpanded: false,

  _leftMonthIsExpandedValidator: observer('leftMonthIsExpanded', function() {
    if (this.get('leftMonthIsExpanded') === true) {
      this.set('leftYearIsExpanded', false);
    }
  }),

  _leftYearIsExpandedValidator: observer('leftYearIsExpanded', function() {
    if (this.get('leftYearIsExpanded') === true) {
      this.set('leftMonthIsExpanded', false);
    }
  }),

  _rightMonthIsExpandedValidator: observer('rightMonthIsExpanded', function() {
    if (this.get('rightMonthIsExpanded') === true) {
      this.set('rightYearIsExpanded', false);
    }
  }),

  _rightYearIsExpandedValidator: observer('rightYearIsExpanded', function() {
    if (this.get('rightYearIsExpanded') === true) {
      this.set('rightMonthIsExpanded', false);
    }
  }),

  actions: {
    toggleLeftYearExpanded() {
      this.toggleProperty('leftYearIsExpanded');
      this.toggleProperty('leftMonthIsExpanded');
    },

    toggleRightYearExpanded() {
      this.toggleProperty('rightYearIsExpanded');
      this.toggleProperty('rightMonthIsExpanded');
    },
  }
});
