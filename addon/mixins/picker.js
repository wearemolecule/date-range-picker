import Ember from 'ember';
import moment from 'moment';

const {
  isBlank,
  observer,
  on,
  Mixin,
} = Ember;

export default Mixin.create({
  dateFormat: "MM/DD/YYYY",
  tabIndex: 1,
  showClear: true,
  startDate: moment().startOf('date'),
  endDate: moment().startOf('date'),
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

    close() {
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.close();
      }
    },

    apply() {
      this.send('close');
      this.sendAction('apply');
    },

    cancel() {
      this.send('close');
      this.sendAction('cancel');
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

    openDropdown(dropdown) {
      this.$().keyup(function(e) {
        if(e.keyCode === 9) {
          dropdown.actions.open();
        }
      });
    },

    tabCloseDropdown(dropdown, e) {
      if (e.keyCode === 9 && dropdown.isOpen) {
        dropdown.actions.close();
      }
    },

  }
});
