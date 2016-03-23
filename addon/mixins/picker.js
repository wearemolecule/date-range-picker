import Ember from 'ember';
import moment from 'moment';

const {
  observer,
  Mixin,
} = Ember;

export default Mixin.create({
  isExpanded: false,

  _startDateToMoment: observer('startDate', function() {
    let startDate = this.get('startDate');

    if (!startDate._isAMomentObject) {
      this.set('startDate', moment(startDate));
    }
  }),

  _endDateToMoment: observer('endDate', function() {
    let endDate = this.get('endDate');

    if (!endDate._isAMomentObject) {
      this.set('endDate', moment(endDate));
    }
  }),

  actions: {
    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
