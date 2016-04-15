import Ember from 'ember';
import moment from 'moment';

const {
  isBlank,
  observer,
  on,
  Mixin,
} = Ember;

export default Mixin.create({
  isExpanded: false,
  startDate: moment().startOf('day'),
  endDate: moment().startOf('day'),

  _startDateToMoment: on('init', observer('startDate', function() {
    let startDate = this.get('startDate');
    let startIsBlank = isBlank(startDate);

    if (startIsBlank || startDate && !startDate._isAMomentObject) {
      this.set('startDate', moment(startDate));
    }
  })),

  _endDateToMoment: on('init', observer('endDate', function() {
    let endDate = this.get('endDate');
    let endIsBlank = isBlank(endDate);

    if (endIsBlank || endDate && !endDate._isAMomentObject) {
      this.set('endDate', moment(endDate));
    }
  })),

  actions: {
    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
