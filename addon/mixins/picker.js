import Ember from 'ember';
import moment from 'moment';
import CancelableMixin from 'date-range-picker/mixins/cancelable';

const {
  isBlank,
  observer,
  on,
  Mixin,
  computed,
} = Ember;

export default Mixin.create(CancelableMixin, {
  dateFormat: "MM/DD/YYYY",
  tabIndex: 1,
  showClear: true,
  startDate: moment().startOf('date'),
  endDate: moment().startOf('date'),
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month'),

  dropdownController: null,
  initiallyOpened: false,

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
    open() {
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.open();
      }
    },
  
    apply() {
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.close();
      }
      this.sendAction('apply', this.get('startDate'), this.get('endDate'));
    },

    parseInput() {
      let [ start, end ] = this.get('rangeFormatted').split('—');
      let startMoment = moment(start, this.get('dateFormat'));
      let endMoment = moment(end, this.get('dateFormat'));

      if(startMoment.isValid() || endMoment.isValid()) {
        if(!endMoment.isValid()) {
          endMoment = startMoment.clone();
        }

        if(!startMoment.isValid()) {
          startMoment = endMoment.clone();
        }

        this.setProperties({
          startDate: startMoment,
          endDate: endMoment,
          startMonth: startMoment.clone().startOf('month'),
          endMonth: endMoment.clone().startOf('month'),
        });
      }
    },

    onFocusInput(dropdown, e) {
      if (e.relatedTarget && (e.relatedTarget.className === 'dp-apply' ||
                              e.relatedTarget.className === 'dp-cancel')) {
        return;
      }
      dropdown.actions.open();
    },

    handleKeydown(dropdown, e) {
      if (e.keyCode === 9 && dropdown.isOpen) { // Tab
        dropdown.actions.close();
      } else if (e.keyCode === 13 && !dropdown.isOpen) { 
        dropdown.actions.toggle();
        e.preventDefault();
      } 
      return false;
    },
  }
});
