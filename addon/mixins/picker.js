import Ember from 'ember';
import moment from 'moment';

const {
  isBlank,
  observer,
  on,
  run,
  Mixin,
} = Ember;

export default Mixin.create({
  isExpanded: false,
  startDate: moment().startOf('day'),
  endDate: moment().startOf('day'),

  _focusOutHandler: on('focusOut', function() {
    if (this.get('isExpanded')) {
      run.next(this, () => {
        let focussedElement = document.activeElement;
        let isFocussedOut = this.$().has(focussedElement).length === 0 &&
            !this.$().is(focussedElement);

        if (isFocussedOut) {
          this.set('isExpanded', false);
        }
      });
    }
  }),

  _startDateToMoment: on('init', observer('startDate', function() {
    let startDate = this.get('startDate');
    let startIsBlank = isBlank(startDate);

    if (startIsBlank || startDate && !startDate._isAMomentObject) {
      this.set('startDate', moment(startDate).startOf('day'));
    }
  })),

  _endDateToMoment: on('init', observer('endDate', function() {
    let endDate = this.get('endDate');
    let endIsBlank = isBlank(endDate);

    if (endIsBlank || endDate && !endDate._isAMomentObject) {
      this.set('endDate', moment(endDate).startOf('day'));
    }
  })),

  actions: {
    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
