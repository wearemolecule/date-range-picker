import Ember from 'ember';
import moment from 'moment';

const {
  isBlank,
  observer,
  on,
  Mixin,
} = Ember;

export default Mixin.create({
  tabIndex: 1,
  actionTabIndex: 1,
  showClear: true,
  isExpanded: false,
  startDate: moment().startOf('date'),
  endDate: moment().startOf('date'),

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
