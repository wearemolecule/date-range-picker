import Ember from 'ember';
import moment from 'moment';
import CancelableMixin from 'date-range-picker/mixins/cancelable';

const {
  isBlank,
  Mixin,
} = Ember;

export default Mixin.create(CancelableMixin, {
  classNameBindings: ['topClass'],
  topClass: 'dp-date-range-picker',
  showInput: true,
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

  didReceiveAttrs() {
    this._super(...arguments);
    let startDate = this.get('startDate');
    let startIsBlank = isBlank(startDate);

    if (typeof startDate === 'string') {
      startDate = this.set('startDate', moment(startDate));
    }

    if (startIsBlank) {
      this.set('startDate', moment(startDate, this.get('dateFormat')).startOf('day'));
    } else if (startDate && !startDate._isAMomentObject) {
      this.set('startDate', moment().startOf(this.get('defaultStart')).startOf('day'));
    }

    let endDate = this.get('endDate');
    if (typeof endDate === 'string') {
      endDate = this.set('endDate', moment(endDate));
    }

    if (!this.get('initialStartDate')) {
      this.resetInitialValues();
    }

    this.set('startMonth', this.get('startDate').clone().startOf('month'));
    if (this.get('endDate')) {
      this.set('endMonth', this.get('endDate').clone().startOf('month'));
    }
  },

  rangeFormatted: Ember.computed('startDate', 'endDate', 'dateFormat', {
    get() {
      let dateFormat = this.get('dateFormat');
      let startDate = this.get('startDate').format(dateFormat);
      let endDate = this.get('endDate') ? this.get('endDate').format(dateFormat) : '';
      return `${startDate}—${endDate}`;
    },

    set(k, v) {
      let [ start, end ] = v.split('—');
      let startMoment = moment(start, this.get('dateFormat'));
      let endMoment = moment(end, this.get('dateFormat'));

      if(startMoment.isValid() || endMoment.isValid()) {
        if(!endMoment.isValid()) {
          endMoment = startMoment.clone().endOf(this.get('defaultEnd')).startOf('day');
        }

        if(!startMoment.isValid()) {
          startMoment = endMoment.clone().startOf(this.get('defaultStart')).startOf('day');
        }

        if (this.get('hasDateParseOverride')) {
          startMoment = this.overrideStartDateParse(startMoment);
          endMoment = this.overrideEndDateParse(endMoment);
        }
      }

      if (startMoment.isValid() && endMoment.isValid()) {
        this.setProperties({
          startDate: startMoment,
          endDate: endMoment,
          startMonth: startMoment.clone().startOf('month'),
          endMonth: endMoment.clone().startOf('month'),
        });
      } else {
        this.set('endDate', null);
      }

      return v;
    },
  }),

  focusOnInput() {
    let element = document.querySelector("." + this.get('topClass') + " .dp-date-input");
    if (this.$(element)) {
      this.$(element).focus();
      this.$(element).select();
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
        dropdown.actions.close(null, false);
      }
      this.sendAction('apply', this.get('startDate'), this.get('endDate'));
    },

    onFocusInput(dropdown, e) {
      if (e && e.relatedTarget && e.relatedTarget.className && (e.relatedTarget.className.includes('dp-apply') ||
                                                                e.relatedTarget.className.includes('dp-cancel') ||
                                                                e.relatedTarget.className.includes('dp-date-input'))) {
        return true;
      }

      dropdown.actions.open(e);
      this.focusOnInput();
    },

    onFocusOut(dropdown, e) {
      if (e && e.relatedTarget) {
        return true;
      }

      this.send('cancel');
    },

    handleKeydown(dropdown, e) {
      if (e.keyCode === 9 && dropdown.isOpen) { // Tab
        this.send('cancel');
      } else if (e.keyCode === 13) { //enter pressed when closed
        if (this.get('dropdownOpen')) {
          if (!this.get('datesSame')) {
            if (this.get('cancelSelected')) {
              this.send('cancel');
            } else {
              this.send('apply');
            }
          }
        } else {
          this.get('dropdownController').actions.toggle();
          if (this.get('dropdownOpen')) {
            this.focusOnInput();
          }
        }
      }
      return false;
    },
  }
});
