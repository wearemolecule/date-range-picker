import Ember from 'ember';
import moment from 'moment';
import CancelableMixin from 'date-range-picker/mixins/cancelable';

const {
  isBlank,
  Mixin,
} = Ember;

export default Mixin.create(CancelableMixin, {
  dateFormat: "MM/DD/YYYY",
  tabIndex: 1,
  showClear: true,
  startDate: moment().startOf('date'),
  endDate: moment().startOf('date'),
  startMonth: moment().startOf('month'),
  endMonth: moment().startOf('month'),
  defaultStart: 'date',
  defaultEnd: 'date',

  dropdownController: Ember.Object.create({
    isOpen: false,
  }),
  initiallyOpened: false,

  init() {
    this._super();
    let startDate = this.get('startDate');
    let startIsBlank = isBlank(startDate);

    if (startIsBlank || startDate && !startDate._isAMomentObject) {
      this.set('startDate', moment(startDate, this.get('dateFormat')).startOf('day'));
    }

    let endDate = this.get('endDate');
    let endIsBlank = isBlank(endDate);

    if (endIsBlank || endDate && !endDate._isAMomentObject) {
      this.set('endDate', moment(endDate, this.get('dateFormat')).startOf('day'));
    }
  },

  actions: {
    open() {
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.open();
      }
    },

    apply() {
      this.resetInitialValues();
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
          endMoment = startMoment.clone().endOf(this.get('defaultEnd'));
        }

        if(!startMoment.isValid()) {
          startMoment = endMoment.clone().startOf(this.get('defaultStart'));
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
      if (e.relatedTarget && (e.relatedTarget.className.includes('dp-apply') ||
                              e.relatedTarget.className.includes('dp-cancel') ||
                              e.relatedTarget.className.includes('dp-date-input'))) {
        return true;
      }
      dropdown.actions.open(e);
    },

    handleKeydown(dropdown, e) {
      if (e.keyCode === 9 && dropdown.isOpen) { // Tab
        this.send('reset');
        dropdown.actions.close();
      } else if (e.keyCode === 13 && !dropdown.isOpen) {
        this.onTriggerReturn();
      }
      return false;
    },
  }
});
